import { FetchOptions, FetchState } from "@/types";
import { useEffect, useState } from "react";


const getCsrfToken = (): string | null => {
  const cookies = document.cookie.split(";");
    for(const cookie of cookies) {
      const [name, value ] = cookie.trim().split('=');
      if(name === "XSRF-TOKEN") {
        return decodeURIComponent(value);
      }
    }
    return null;
}


const fetchCsrfToken = async (baseUrl: string): Promise<void> => {
  try {
    await fetch(`${baseUrl}/csrf-token`, {
      method: "GET",
      credentials: "include"
    });
  } catch(error) {
    console.error('Failed to fetch CSRF token:', error);
  }
}

{
  /* T expected data typeni bildiradi */
}
export function useFetch<T>(url: string, options: FetchOptions = {}) {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  const baseUrl = url.split('/').slice(0, 3).join('/');

 // CSRF tokenni fetch qilish uchun effect
 useEffect(() => {
  const nonGetRequest = options.method && options.method !== 'GET';
  
  // faqat fetch CSRF token qilamiz qachoni state-changing request bo'lsa
  if (nonGetRequest && !getCsrfToken()) {
    fetchCsrfToken(baseUrl);
  }
}, [baseUrl, options.method]);


  useEffect(() => {
    {
      /* komponentimiz unmount bo'lganda fetch callni cancel qilish uchun abortcontrolelr */
    }

    const abortController = new AbortController();
    const signal = abortController.signal;

    const fetchData = async () => {
      try {
        setState((prev) => ({
          ...prev,
          loading: true,
        }));

        const headers: HeadersInit = {
          "Content-Type": "application/json",
          ...options.headers,
        };

        if (options.method && ['POST', 'PUT', 'PATCH', 'DELETE'].includes(options.method.toUpperCase())) {
          const token = getCsrfToken();
          if (token) {
            (headers as Record<string, string>)['X-CSRF-TOKEN'] = token;
            (headers as Record<string, string>)['CSRF-Token'] = token;
          } else {
            // Iif we dont have token yet for a state-changing request, we get one first
            await fetchCsrfToken(baseUrl);
            const newToken = getCsrfToken();
            if (newToken) {
              (headers as Record<string, string>)['X-CSRF-TOKEN'] = newToken;
              (headers as Record<string, string>)['CSRF-Token'] = newToken;
            }
          }
        }

        // fetchoption larni set qilamiz
        const fetchOptions: RequestInit = {
          method: options.method || "GET",
          headers,
          credentials: "include",
          signal,
          ...(options.body ? { body: JSON.stringify(options.body) } : {}),
        };

        const response = await fetch(url, fetchOptions);

        if (!response.ok) {
          throw new Error(`HTTP error, status is: ${response.status}`);
        }
        const data = await response.json();
        if (!signal.aborted) {
          // stateni update qilamiz
          setState({
            data: data.data,
            loading: false,
            error: null,
          });
        }
      } catch (error) {
        if (!signal) {
          setState({
            data: null,
            loading: false,
            error: error as Error,
          });
        }
      }
    };
    fetchData();

    return () => {
      abortController.abort();
    };
  }, [url, JSON.stringify(options)]);

  // manually datani refresh qilish uchun method
  const refresh = async () => {
    setState((prev) => ({ ...prev, loading: true }));
    try {
      // prepare headers with CSRF token
      const headers: HeadersInit = {
        "Content-Type": "application/json",
        ...options.headers,
      };

      // we add a CSRF token for non-GET requests
      if (options.method && ['POST', 'PUT', 'PATCH', 'DELETE'].includes(options.method.toUpperCase())) {
        const token = getCsrfToken();
        if (token) {
          (headers as Record<string, string>)['X-CSRF-TOKEN'] = token;
          (headers as Record<string, string>)['CSRF-Token'] = token;
        } else {
          await fetchCsrfToken(baseUrl);
          const newToken = getCsrfToken();
          if (newToken) {
            (headers as Record<string, string>)['X-CSRF-TOKEN'] = newToken;
            (headers as Record<string, string>)['CSRF-Token'] = newToken;
          }
        }
      }

      const fetchOptions: RequestInit = {
        method: options.method || "GET",
        headers,
        credentials: 'include', // cookie uchun muhim
        ...(options.body ? { body: JSON.stringify(options.body) } : {}),
      };
      
      const response = await fetch(url, fetchOptions);
      const data = await response.json();
      setState({
        data: data.data,
        loading: false,
        error: null,
      });
    } catch (error) {
      setState({
        data: null,
        loading: false,
        error: error as Error,
      });
    }
  };

  // current state va refresh methodni qaytaramiz
  return { ...state, refresh };
}

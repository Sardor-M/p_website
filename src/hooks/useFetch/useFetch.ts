import { FetchOptions, FetchState } from "@/types";
import { useEffect, useState } from "react";

{
  /* T expected data typeni bildiradi */
}
export function useFetch<T>(url: string, options: FetchOptions = {}) {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: true,
    error: null,
  });

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

        const headers = {
          "Content-Type": "application/json",
          ...options.headers,
        };

        // fetchoption larni set qilamiz
        const fetchOptions: RequestInit = {
          method: options.method || "GET",
          headers,
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
            data,
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
      const response = await fetch(url, options);
      const data = await response.json();
      setState({
        data,
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

import { API_ENDPOINTS } from "@/api/config";
import { useEffect, useState } from "react";

export function useCsrfInit() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const initCsrf = async () => {
      try {
        // we first fetch CSRF token from the server
        const response = await fetch(`${API_ENDPOINTS.BASE_URL}/csrf-token`, {
          method: 'GET',
          credentials: 'include', // cookie uchun muhim
        });

        if (!response.ok) {
          throw new Error(`Failed to initialize security: ${response.status}`);
        }

        setIsLoaded(true);
      } catch (err) {
        console.error('CSRF initialization error:', err);
        setError(err instanceof Error ? err : new Error('Failed to initialize security'));
      }
    };

    initCsrf();
  }, []);

  return { isLoaded, error };
}
import { useState, useCallback } from 'react';
import { AxiosResponse } from 'axios';

type FetchResponse = {
  data: any;
  error: string | null;
  isLoading: boolean;
};

export default function useFetch(
  req: (...args: any) => Promise<AxiosResponse>
): [FetchResponse, (...args: any) => Promise<any>] {
  const [data, setData]: [any, Function] = useState(null);
  const [error, setError]: [string | null, Function] = useState(null);
  const [isLoading, setIsLoading]: [boolean, Function] = useState(false);

  const fetch = useCallback(
    async (...args: any): Promise<any> => {
      try {
        setIsLoading(true);
        const resp = await req(...args);
        setData(resp.data);
      } catch (error) {
        setError('Failed to fetch');
      } finally {
        setIsLoading(false);
      }
    },
    [req]
  );

  return [{ data, error, isLoading }, fetch];
}

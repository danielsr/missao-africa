import { useState } from 'react';
import axios from '../services/axiosConfig';

export default function useFetch() {
  const [data, setData]: [any, Function] = useState([]);
  const [error, setError]: [string | null, Function] = useState(null);
  const [isLoading, setIsLoading]: [boolean, Function] = useState(false);

  const fetch = async (url: string): Promise<any> => {
    try {
      setIsLoading(true);
      const resp = await axios.get(url);
      setData(resp.data);
    } catch (error) {
      setError('Failed to fetch');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    data,
    fetch,
    error,
    isLoading,
  };
}

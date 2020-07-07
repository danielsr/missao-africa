import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import useDebounce from 'hooks/useDebounce';
import useQuery from 'hooks/useQuery';

export default function useSearch(callback?: Function) {
  const history = useHistory();
  const query = useQuery();
  const searchQuery = query.get('search') || '';
  const [search, setSearch]: [string, Function] = useState(searchQuery);

  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    history.replace(`?search=${debouncedSearch}`);
    callback?.();
  }, [debouncedSearch, history]);

  return {
    search,
    setSearch,
    debouncedSearch,
  };
}

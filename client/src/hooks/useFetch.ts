import { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import useDebounce from '../hooks/useDebounce';
import useQuery from '../hooks/useQuery';

export default function useFetch<T>(apiCall: Function) {
    const history = useHistory();
    const query = useQuery();
    const searchQuery = query.get('search') || '';

    const [pageIndex, setPageIndex]: [number, Function] = useState(1);
    const [search, setSearch]: [string, Function] = useState(searchQuery);
    const [items, setItems]: [T[], Function] = useState([]);
    const [error, setError]: [string | null, Function] = useState(null);
    const [isLoading, setIsLoading]: [boolean, Function] = useState(false);
    const [hasMore, setHasMore]: [boolean, Function] = useState(false);

    const debouncedSearch = useDebounce(search, 500);

    const getItems = useCallback(
        async (pageIndex): Promise<T[] | null> => {
            try {
                setIsLoading(true);
                const resp = await apiCall(debouncedSearch, pageIndex);
                const { items: newItems, pageSize, totalCount } = resp.data;
                const lastPage = totalCount / pageSize;
                setPageIndex(pageIndex);
                setHasMore(lastPage > pageIndex);
                return newItems;
            } catch (error) {
                setError('Failed to fetch');
                return null;
            } finally {
                setIsLoading(false);
            }
        },
        [debouncedSearch, apiCall],
    );

    useEffect(() => {
        getItems(1).then((newItems) => {
            setItems(newItems);
            history.replace(`?search=${debouncedSearch}`);
        });
    }, [debouncedSearch, getItems, history]);

    const loadMore = () => {
        getItems(pageIndex + 1).then((newItems) => {
            newItems && setItems([...items, ...newItems]);
        });
    };

    return {
        items,
        error,
        search,
        setSearch,
        loadMore,
        isLoading,
        hasMore,
    };
}

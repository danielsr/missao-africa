import { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { Sponsor } from '../../types';
import api from '../../services/api';
import useDebounce from '../../hooks/useDebounce';
import useQuery from '../../hooks/useQuery';

export default function useSponsors() {
    const history = useHistory();
    const query = useQuery();
    const searchQuery = query.get('search') || '';

    const [pageIndex, setPageIndex]: [number, Function] = useState(1);
    const [search, setSearch]: [string, Function] = useState(searchQuery);
    const [sponsors, setSponsors]: [Sponsor[], Function] = useState([]);
    const [error, setError]: [string | null, Function] = useState(null);
    const [isLoading, setIsLoading]: [boolean, Function] = useState(false);
    const [hasMore, setHasMore]: [boolean, Function] = useState(false);

    const debouncedSearch = useDebounce(search, 500);

    const getSponsors = useCallback(
        async (pageIndex): Promise<Sponsor[] | null> => {
            try {
                setIsLoading(true);
                const resp = await api.getSponsors(debouncedSearch, pageIndex);
                const { items, pageSize, totalCount } = resp.data;
                const lastPage = Math.ceil(totalCount / pageSize);
                setPageIndex(pageIndex);
                setHasMore(lastPage > pageIndex);
                return items;
            } catch (error) {
                setError('Failed to fetch sponsors');
                return null;
            } finally {
                setIsLoading(false);
            }
        },
        [debouncedSearch],
    );

    useEffect(() => {
        getSponsors(1).then((items) => {
            setSponsors(items);
            history.replace(`/sponsors?search=${debouncedSearch}`);
        });
    }, [debouncedSearch, setPageIndex, getSponsors, history]);

    const loadMore = () => {
        getSponsors(pageIndex + 1).then((items) => {
            items && setSponsors([...sponsors, ...items]);
        });
    };

    return {
        sponsors,
        error,
        search,
        setSearch,
        loadMore,
        isLoading,
        hasMore,
    };
}

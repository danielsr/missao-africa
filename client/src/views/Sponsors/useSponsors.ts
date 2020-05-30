import { useState, useEffect } from 'react';
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

    const getSponsors = async (): Promise<Sponsor[] | null> => {
        try {
            setIsLoading(true);
            const resp = await api.getSponsors(debouncedSearch, pageIndex);
            const { items, pageSize, totalCount } = resp.data;
            const thereIsMore = totalCount / pageSize > pageIndex;
            setHasMore(thereIsMore);
            return items;
        } catch (error) {
            setError('Failed to fetch sponsors');
            return null;
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        setPageIndex(1);
        getSponsors().then((items) => {
            setSponsors(items);
            history.replace(`/sponsors?search=${debouncedSearch}`);
        });
    }, [debouncedSearch, setPageIndex]);

    const loadMore = () => {
        setPageIndex(pageIndex + 1);
        getSponsors().then((items) => {
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

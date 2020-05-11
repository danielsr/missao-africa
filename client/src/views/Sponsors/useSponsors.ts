import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Sponsor } from '../../types';
import api from '../../services/api';
import useDebounce from '../../hooks/useDebounce';
import useQuery from '../../hooks/useQuery';
import { PaginationProps } from '../../components/Pagination';

export default function useSponsors() {
    const history = useHistory();
    const query = useQuery();
    const searchQuery = query.get('search');
    const pageIndexQuery = query.get('pageIndex') || '1';

    const [pageIndex, setPageIndex]: [string, Function] = useState(pageIndexQuery);
    const [sponsors, setSponsors]: [Sponsor[], Function] = useState([]);
    const [pagination, setPagination]: [PaginationProps, Function] = useState({});
    const [error, setError]: [string | null, Function] = useState(null);
    const [search, setSearch]: [string, Function] = useState(searchQuery || '');

    const debouncedSearch = useDebounce(search, 500);

    useEffect(() => {
        const fetchSponsors = async () => {
            try {
                const resp = await api.getSponsors(debouncedSearch, pageIndex);
                const { items, ...rest } = resp.data;
                setSponsors(items);
                setPagination(rest);
                history.replace(`/sponsors?search=${debouncedSearch}&pageIndex=${pageIndex}`);
            } catch (error) {
                setError('Failed to fetch sponsors');
            }
        };

        fetchSponsors();
    }, [debouncedSearch, history, pageIndex]);

    return {
        sponsors,
        error,
        search,
        setSearch,
        pagination,
        setPageIndex,
    };
}

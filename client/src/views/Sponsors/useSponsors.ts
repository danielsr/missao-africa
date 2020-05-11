import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Sponsor } from '../../types';
import api from '../../services/api';
import useDebounce from '../../hooks/useDebounce';
import useQuery from '../../hooks/useQuery';

export default function useSponsors() {
    const history = useHistory();
    const query = useQuery();
    const searchQuery = query.get('search');
    const pageIndex = query.get('pageIndex') || '1';

    const [sponsors, setSponsors]: [Sponsor[], Function] = useState([]);
    const [error, setError]: [string | null, Function] = useState(null);
    const [search, setSearch]: [string, Function] = useState(searchQuery || '');

    const debouncedSearch = useDebounce(search, 500);

    useEffect(() => {
        const fetchSponsors = async () => {
            try {
                const resp = await api.getSponsors(debouncedSearch, pageIndex);
                setSponsors(resp.data.items);
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
    };
}

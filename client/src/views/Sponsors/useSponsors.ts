import { useState, useEffect } from 'react';
import { Sponsor } from '../../types';
import api from '../../services/api';
import useDebounce from '../../hooks/useDebounce';

export default function useSponsors() {
    const [sponsors, setSponsors]: [Sponsor[], Function] = useState([]);
    const [error, setError]: [string | null, Function] = useState(null);
    const [search, setSearch]: [string, Function] = useState('');
    const debouncedSearch = useDebounce(search, 500);

    useEffect(() => {
        const fetchSponsors = async () => {
            try {
                const resp = await api.getSponsors(debouncedSearch);
                setSponsors(resp.data);
            } catch (error) {
                setError('Failed to fetch sponsors');
            }
        };

        fetchSponsors();
    }, [debouncedSearch]);

    return {
        sponsors,
        error,
        search,
        setSearch,
    };
}

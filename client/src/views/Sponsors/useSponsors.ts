import { useState, useEffect } from 'react';
import { Sponsor } from '../../types';
import api from '../../services/api';
import useForm from '../../hooks/useForm';
import useDebounce from '../../hooks/useDebounce';

export default function useSponsors() {
    const [sponsors, setSponsors]: [Sponsor[], Function] = useState([]);
    const [error, setError]: [string | null, Function] = useState(null);
    const { values, bindInput } = useForm({ search: '' });
    const debouncedSearch = useDebounce(values.search, 500);

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
        bindInputSearch: bindInput('search'),
    };
}

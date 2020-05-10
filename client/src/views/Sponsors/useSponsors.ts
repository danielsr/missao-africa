import { useState } from 'react';
import { Sponsor } from '../../types';
import api from '../../services/api';

export function useSponsors() {
    const [sponsors, setSponsors]: [Sponsor[], Function] = useState([]);
    const [error, setError]: [string | null, Function] = useState(null);
    const fetchSponsors = async (search) => {
        try {
            const resp = await api.getSponsors(search);
            setSponsors(resp.data);
        } catch (error) {
            setError('Failed to fetch sponsors');
        }
    };

    return {
        sponsors,
        fetchSponsors,
        error,
    };
}

import { useState, ChangeEvent } from 'react';
import Papa from 'papaparse';

export function useSponsors() {
    const [sponsors, setSponsors]: [string[][], Function] = useState([]);
    const [error, setError]: [string | null, Function] = useState(null);

    const importSponsors = (event: ChangeEvent<HTMLInputElement>): void => {
        if (!event.target.files?.[0]) {
            setError('No file');
            setSponsors([]);
            return;
        }
        Papa.parse(event.target.files?.[0], {
            complete: function (results) {
                if (results.errors.length > 0) {
                    setError('Error trying to parse the file');
                    setSponsors([]);
                } else {
                    setError(null);
                    setSponsors(results.data);
                }
            },
            error: function (error) {
                setError(error.message);
                setSponsors([]);
            },
        });
    };

    return {
        sponsors,
        importSponsors,
        error,
    };
}

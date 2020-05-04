import { useState, ChangeEvent } from 'react';
import Papa from 'papaparse';

export function useSponsors() {
    const [sponsors, setSponsors]: [string[][], Function] = useState([]);
    const [error, setError]: [string | null, Function] = useState(null);

    const importSponsors = (event: ChangeEvent<HTMLInputElement>): Promise<void> =>
        new Promise((resolve, reject) => {
            Papa.parse(event.target.files?.[0], {
                complete: function (results) {
                    if (results.errors.length > 0) {
                        setError('Error trying to parse the file');
                        reject();
                    } else {
                        setSponsors(results.data);
                        resolve();
                    }
                },
                error: function (error) {
                    setError(error.message);
                    reject();
                },
            });
        });
    return {
        sponsors,
        importSponsors,
        error,
    };
}

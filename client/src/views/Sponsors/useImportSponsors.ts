import { useState, ChangeEvent } from 'react';
import Papa from 'papaparse';
import { Sponsor } from '../../types';

function mapSponsors(sponsorsArray: string[][]): Sponsor[] {
  return sponsorsArray.slice(1).map((row) => ({
    submitedAt: new Date(row[0]),
    name: row[1],
    cpf: row[2],
    email: row[3],
    phone: row[4],
    address: row[5],
    notes: row[6],
    locale: row[7],
  }));
}

export function useImportSponsors() {
  const [sponsors, setSponsors]: [Sponsor[], Function] = useState([]);
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
          setSponsors(mapSponsors(results.data));
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

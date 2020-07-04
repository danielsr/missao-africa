import { useState, ChangeEvent } from 'react';
import Papa from 'papaparse';
import { Person } from '../../types';

function mapPeople(peopleArray: string[][]): Person[] {
  return peopleArray.slice(1).map((row) => ({
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

export function useImportPeople() {
  const [people, setPeople]: [Person[], Function] = useState([]);
  const [error, setError]: [string | null, Function] = useState(null);

  const importPeople = (event: ChangeEvent<HTMLInputElement>): void => {
    if (!event.target.files?.[0]) {
      setError('No file');
      setPeople([]);
      return;
    }
    Papa.parse(event.target.files?.[0], {
      complete: function (results) {
        if (results.errors.length > 0) {
          setError('Error trying to parse the file');
          setPeople([]);
        } else {
          setError(null);
          setPeople(mapPeople(results.data));
        }
      },
      error: function (error) {
        setError(error.message);
        setPeople([]);
      },
    });
  };

  return {
    people,
    importPeople,
    error,
  };
}

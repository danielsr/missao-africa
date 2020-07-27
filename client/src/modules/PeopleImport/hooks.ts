import { useState, ChangeEvent } from 'react';
import Papa from 'papaparse';
import { Person } from 'types';
import { cpf } from 'lib/validation';
import api from 'services/api';

function mapPeople(peopleArray: string[][]): Person[] {
  return peopleArray
    .slice(1)
    .map((row) => ({
      submitedAt: new Date(row[0]),
      name: row[1],
      cpf: row[2],
      email: row[3],
      phone: row[4],
      address: row[5],
      notes: row[6],
      locale: row[7],
    }))
    .filter(({ email }) => email);
}

function validatePeople(people: Person[]) {
  return Promise.all(
    people.map(async (person) => {
      const { data: email } = await api.checkEmail(person.email);
      const validationErrors = {
        cpf: cpf(person.cpf),
        email: email.exists ? 'Email has already been used' : null,
      };
      return { ...person, validationErrors };
    })
  );
}

export function useImportPeople() {
  const [people, setPeople]: [Person[], Function] = useState([]);
  const [isLoading, setIsLoading]: [boolean, Function] = useState(false);
  const [error, setError]: [string | null, Function] = useState(null);

  const importPeople = (event: ChangeEvent<HTMLInputElement>): void => {
    setIsLoading(true);
    if (!event.target.files?.[0]) {
      setError('No file');
      setPeople([]);
    }
    Papa.parse(event.target.files?.[0], {
      complete: async function (results) {
        if (results.errors.length > 0) {
          setError('Error trying to parse the file');
          setPeople([]);
          setIsLoading(false);
        } else {
          setError(null);
          const mappedPeople = mapPeople(results.data);
          const validatedPeople = await validatePeople(mappedPeople);
          setPeople(validatedPeople);
          setIsLoading(false);
        }
      },
      error: function (error) {
        setError(error.message);
        setPeople([]);
        setIsLoading(false);
      },
    });
  };

  return {
    people,
    importPeople,
    error,
    isLoading,
  };
}

import React from 'react';
import { useHistory } from 'react-router-dom';
import { useImportPeople } from './hooks';
import Grid, { GridField } from 'components/Grid';
import { Button, InputFile, Page } from 'components';
import api from 'services/api';

function PeopleImport() {
  const history = useHistory();
  const { people, importPeople, error } = useImportPeople();
  const fields: GridField[] = [
    { name: 'name', label: 'Name' },
    { name: 'email', label: 'Email' },
  ];

  return (
    <Page title="Import People">
      <div className="flex justify-between py-4">
        <div></div>
        <div>
          <Button
            label="Import"
            onClick={() => api.importPeople(people)}
            disabled={people.length === 0}
          />
          <Button label="Cancel" onClick={() => history.push('/people')} />
        </div>
      </div>
      <InputFile onChange={importPeople} />
      {error && <span>{error}</span>}
      {people.length > 0 && !error && <Grid fields={fields} data={people} />}
    </Page>
  );
}

export default PeopleImport;

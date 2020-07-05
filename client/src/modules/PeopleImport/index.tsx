import React from 'react';
import { useImportPeople } from './hooks';
import Grid, { GridField } from 'components/Grid';
import { Button, InputFile, Page, Block } from 'components';
import api from 'services/api';
import { LinkButton, ButtonType } from 'components/Button';

function PeopleImport() {
  const { people, importPeople, error } = useImportPeople();
  const fields: GridField[] = [
    { name: 'name', label: 'Name' },
    { name: 'email', label: 'Email' },
  ];

  return (
    <Page title="Import People">
      <Block>
        <InputFile onChange={importPeople} />
        {error && <span>{error}</span>}
        {people.length > 0 && !error && <Grid fields={fields} data={people} />}
        <div className="flex mt-8">
          <Button
            label="Import"
            onClick={() => api.importPeople(people)}
            disabled={people.length === 0}
            className="mr-2"
          />
          <LinkButton type={ButtonType.secondary} label="Cancel" to="/people" />
        </div>
      </Block>
    </Page>
  );
}

export default PeopleImport;

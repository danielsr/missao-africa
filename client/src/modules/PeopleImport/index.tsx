import React, { useState } from 'react';
import { useImportPeople } from './hooks';
import Grid, { GridField } from 'components/Grid';
import { Button, InputFile, Page, Block } from 'components';
import api from 'services/api';
import { LinkButton, ButtonType } from 'components/Button';
import Tabs, { Tab } from 'components/Tabs';

function PeopleImport() {
  const [activeTab, setActiveTab] = useState('file');
  const { people, importPeople, error } = useImportPeople();
  const fields: GridField[] = [
    { name: 'name', label: 'Name' },
    { name: 'email', label: 'Email' },
  ];
  const tabs: Tab[] = [
    { name: 'file', label: 'Choose file' },
    { name: 'check', label: 'Check records' },
  ];

  const importFile = (e) => {
    setActiveTab('check');
    importPeople(e);
  };

  return (
    <Page title="Import People">
      <Block>
        <Tabs tabs={tabs} active={activeTab} onChange={setActiveTab} className="border-b" />
        {activeTab === 'file' && (
          <div className="mt-8">
            <InputFile onChange={importFile} />
          </div>
        )}
        {activeTab === 'check' && (
          <div className="mt-8">
            {error && <span>{error}</span>}
            {people.length > 0 && !error && <Grid fields={fields} data={people} />}
            <div className="flex mt-8">
              <Button
                label="Import"
                onClick={() => api.importPeople(people)}
                disabled={people.length === 0}
                className="mr-2"
              />
              <LinkButton type={ButtonType.Secondary} label="Cancel" to="/people" />
            </div>
          </div>
        )}
      </Block>
    </Page>
  );
}

export default PeopleImport;

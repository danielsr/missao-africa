import React, { useState } from 'react';
import classnames from 'classnames';
import { format as formatCpf } from '@fnando/cpf';
import { useImportPeople } from './hooks';
import { Button, InputFile, Page, Block, Spinner } from 'components';
import api from 'services/api';
import { LinkButton, ButtonType } from 'components/Button';
import Tabs, { Tab } from 'components/Tabs';
import { Person } from 'types';
import { useToaster } from 'store/toaster/hooks';

function PersonCard({ person }: { person: Person }) {
  const anyValidationError = person.validationErrors?.cpf || person.validationErrors?.email;
  const className = classnames('flex p-4 rounded bg-gray-200 mb-2 text-sm', {
    'border border-red-500': anyValidationError,
  });
  return (
    <div className={className}>
      <div className="w-1/2 mr-4">
        <p>
          <b>Name:</b> {person.name}
        </p>
        <p className={person.validationErrors?.email && 'text-red-500'}>
          <b>Email:</b> {person.email}
          {person.validationErrors?.email && ` (${person.validationErrors?.email})`}
        </p>
        <p className={person.validationErrors?.cpf && 'text-red-500'}>
          <b>CPF:</b> {formatCpf(person.cpf)}
          {person.validationErrors?.cpf && ` (${person.validationErrors?.cpf})`}
        </p>
      </div>
      <div className="w-1/2">
        <p>
          <b>Address:</b> {person.address}
        </p>
        <p>
          <b>Phone:</b> {person.phone}
        </p>
        <p>
          <b>Notes:</b> {person.notes}
        </p>
      </div>
    </div>
  );
}

function PeopleImport() {
  const [activeTab, setActiveTab] = useState('file');
  const { people, importPeople, error, isLoading } = useImportPeople();
  const [isSaving, setIsSaving] = useState(false);
  const { showToaster } = useToaster();
  const tabs: Tab[] = [
    { name: 'file', label: 'Choose file' },
    { name: 'check', label: 'Check records' },
  ];
  const hasAnyValidationError = people.some(
    ({ validationErrors }) => validationErrors?.cpf || validationErrors?.email
  );

  const importFile = (e) => {
    setActiveTab('check');
    importPeople(e);
  };

  const savePeople = async () => {
    setIsSaving(true);
    await api.importPeople(people);
    setIsSaving(false);
    showToaster('People imported!');
    setActiveTab('file');
  };

  return (
    <Page title="Import People">
      <Tabs tabs={tabs} active={activeTab} onChange={setActiveTab} className="ml-1" disabled />
      <Block className="border">
        {activeTab === 'file' && <InputFile onChange={importFile} />}
        {activeTab === 'check' && (
          <>
            {error && <span>{error}</span>}
            {isLoading && <Spinner />}
            {people.length > 0 &&
              !isLoading &&
              !error &&
              people.map((person, index) => (
                <PersonCard person={person} key={`Person_Row_${index}`} />
              ))}
            {!isLoading && (
              <div className="flex mt-8">
                <Button
                  label="Import"
                  onClick={savePeople}
                  disabled={people.length === 0 || hasAnyValidationError}
                  className="mr-2"
                  working={isSaving}
                />
                <LinkButton type={ButtonType.Secondary} label="Cancel" to="/people" />
              </div>
            )}
          </>
        )}
      </Block>
    </Page>
  );
}

export default PeopleImport;

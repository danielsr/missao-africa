import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Input, Button, LinkButton, Spinner, Modal } from 'components';
import { InputType } from 'components/Input';
import { ButtonType } from 'components/Button';
import { useForm } from 'hooks';
import { useLabels } from 'modules/Labels/hooks';
import { toDatetimeLocal } from 'lib/date';
import { required, email, cpf } from 'lib/validation';
import { ModalSize } from 'components/Modal';
import Tabs, { Tab } from 'components/Tabs';
import LabelInput from 'components/LabelInput';
import { usePerson } from './hooks';

function PeopleEdit() {
  const { id } = useParams();
  const { labels } = useLabels();
  const { savePerson, isSaving, loadPerson, isLoading, person } = usePerson();
  const isEditing = id > 0;

  const initialValues = {
    submitedAt: toDatetimeLocal(new Date().toUTCString()),
  };
  const formValidation = {
    name: [required],
    email: [required, email],
    cpf: [required, cpf],
  };
  const { invalid, values, setValues, bindInput } = useForm(initialValues, formValidation);

  const [activeTab, setActiveTab] = useState('personal');
  const tabs: Tab[] = [
    { name: 'personal', label: 'Personal Data' },
    { name: 'boleto', label: 'Boleto Bancario' },
  ];

  useEffect(() => {
    isEditing && loadPerson(id);
  }, [isEditing, id, loadPerson]);

  useEffect(() => {
    isEditing && person && setValues(person);
  }, [person, setValues, isEditing]);

  const renderForm = () => (
    <div>
      <div className="flex mb-2">
        <Input label="Name" className="w-1/2 mr-4" {...bindInput('name')} />
        <Input label="Email" className="w-1/2" {...bindInput('email')} />
      </div>
      <div className="flex mb-2">
        <Input label="CPF" className="w-1/2 mr-4" {...bindInput('cpf')} />
        <Input label="Phone" className="w-1/2" {...bindInput('phone')} />
      </div>
      <div className="flex mb-2">
        <Input label="Address" className="w-1/2 mr-4" {...bindInput('address')} />
        <Input
          label="Submited at"
          type={InputType.datetimeLocal}
          className="w-1/2"
          disabled={values.id}
          {...bindInput('submitedAt')}
        />
      </div>
      <Input label="Notes" className="mb-2" {...bindInput('notes')} />
      <LabelInput label="Labels" labels={labels} {...bindInput('labels')} />
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'personal':
        return renderForm();
      default:
        return <div>...</div>;
    }
  };

  const modalHeader = () => (
    <Tabs className="mx-4" tabs={tabs} active={activeTab} onChange={setActiveTab} />
  );

  const modalFooter = () => (
    <>
      <Button
        icon="save"
        label="Save"
        onClick={() => savePerson(values)}
        className="mr-2"
        working={isSaving}
        disabled={invalid}
      />
      <LinkButton label="Cancel" type={ButtonType.Secondary} to="/people" />
    </>
  );

  return (
    <Modal
      title={`Person: ${values.name || 'New'}`}
      footer={modalFooter}
      header={modalHeader}
      size={ModalSize.Large}
      closeRoute="/people"
    >
      {isLoading ? <Spinner /> : renderContent()}
    </Modal>
  );
}

export default PeopleEdit;

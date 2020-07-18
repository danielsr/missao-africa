import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Input, LabelGroup, Button, LinkButton, Spinner, Modal } from 'components';
import { InputType } from 'components/Input';
import { ButtonType } from 'components/Button';
import { useForm } from 'hooks';
import api from 'services/api';
import useToaster from 'store/useToaster';
import { useLabels } from 'modules/Labels/hooks';
import { toDatetimeLocal } from 'util/date';
import { required, email, cpf } from 'util/validation';
import { ModalSize } from 'components/Modal';

function PeopleEdit() {
  const history = useHistory();
  const { id } = useParams();
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(false);
  const { showToaster } = useToaster();
  const { labels } = useLabels();
  const initialValues = {
    submitedAt: toDatetimeLocal(new Date().toUTCString()),
  };
  const formValidation = {
    name: [required],
    email: [required, email],
    cpf: [required, cpf],
  };
  const { invalid, values, setValues, bindInput } = useForm(initialValues, formValidation);

  const save = async () => {
    try {
      setSaving(true);
      await api.savePerson(values);
      history.push('/people');
      showToaster('People saved!');
    } catch (error) {
      console.log(error);
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    const fetchPerson = async () => {
      if (id > 0) {
        try {
          setLoading(true);
          const resp = await api.getPerson(id);
          setValues(resp.data);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchPerson();
  }, [id, setValues, setLoading]);

  const modalFooter = () => (
    <>
      <Button
        icon="save"
        label="Save"
        onClick={save}
        className="mr-2"
        working={saving}
        disabled={invalid}
      />
      <LinkButton label="Cancel" type={ButtonType.Secondary} to="/people" />
    </>
  );

  return (
    <Modal title="People Edit" footer={modalFooter} size={ModalSize.Large}>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <LabelGroup labels={labels} value={values.labels} />
          <Input label="Name" className="mb-2 mt-4" {...bindInput('name')} />
          <Input label="Email" className="mb-2" {...bindInput('email')} />
          <Input label="CPF" className="mb-2" {...bindInput('cpf')} />
          <Input label="Phone" className="mb-2" {...bindInput('phone')} />
          <Input label="Address" className="mb-2" {...bindInput('address')} />
          <Input label="Notes" className="mb-2" {...bindInput('notes')} />
          <Input
            label="Submited at"
            type={InputType.datetimeLocal}
            className="mb-2"
            disabled
            {...bindInput('submitedAt')}
          />
        </>
      )}
    </Modal>
  );
}

export default PeopleEdit;

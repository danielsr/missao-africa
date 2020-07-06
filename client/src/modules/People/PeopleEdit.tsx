import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Button, Page, Input, Block } from 'components';
import useForm from 'hooks/useForm';
import api from 'services/api';
import useToaster from 'store/useToaster';
import { InputType } from 'components/Input';
import LabelGroup from 'components/LabelGroup';
import { useLabels } from 'modules/Labels/hooks';
import { ButtonType, LinkButton } from 'components/Button';

function PeopleEdit() {
  const history = useHistory();
  const { id } = useParams();
  const [saving, setSaving] = useState(false);
  const { values, setValues, bindInput } = useForm({});
  const { showToaster } = useToaster();
  const { labels } = useLabels();

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
        const resp = await api.getPerson(id);
        setValues(resp.data);
      }
    };
    fetchPerson();
  }, [id, setValues]);

  return (
    <Page title="People">
      <Block>
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
        <div className="flex mt-8">
          <Button icon="save" label="Save" onClick={save} className="mr-2" working={saving} />
          <LinkButton label="Cancel" type={ButtonType.Secondary} to="/people" />
        </div>
      </Block>
    </Page>
  );
}

export default PeopleEdit;

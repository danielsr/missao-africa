import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Button, Title, Input } from '../../components';
import useForm from '../../hooks/useForm';
import api from '../../services/api';
import useToaster from '../../store/useToaster';
import { InputType } from '../../components/Input';
import LabelGroup from '../../components/LabelGroup';
import useLabels from '../Labels/useLabels';

function SponsorsEdit() {
  const history = useHistory();
  const { id } = useParams();
  const { values, setValues, bindInput } = useForm({});
  const { showToaster } = useToaster();
  const { labels } = useLabels();

  const save = async () => {
    try {
      await api.saveSponsors(values);
      history.push('/sponsors');
      showToaster('Sponsor saved!');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchSponsor = async () => {
      if (id > 0) {
        const resp = await api.getSponsor(id);
        setValues(resp.data);
      }
    };
    fetchSponsor();
  }, [id, setValues]);

  return (
    <div>
      <Title title="Sponsors Form" />
      <div className="flex justify-between py-4">
        <div></div>
        <div>
          <Button label="Save" onClick={save} />
          <Button label="Cancel" onClick={() => history.push('/sponsors')} />
        </div>
      </div>
      <div className="w-1/2">
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
      </div>
    </div>
  );
}

export default SponsorsEdit;

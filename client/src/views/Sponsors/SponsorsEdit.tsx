import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Title from '../../components/Title';
import Button from '../../components/Button';
import Input from '../../components/Input';
import useForm from '../../hooks/useForm';
import api from '../../services/api';

function SponsorsEdit() {
  const history = useHistory();
  const { id } = useParams();
  const { values, setValues, bindInput } = useForm({ name: '', email: '' });

  const save = async () => {
    try {
      await api.saveSponsors(values);
      history.push('/sponsors');
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
        <Input label="Name" className="mb-2" {...bindInput('name')} />
        <Input label="Email" {...bindInput('email')} />
      </div>
    </div>
  );
}

export default SponsorsEdit;

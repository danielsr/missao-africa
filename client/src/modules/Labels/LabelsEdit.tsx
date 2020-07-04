import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Button, Page, Input } from 'components';
import useForm from 'hooks/useForm';
import api from 'services/api';
import useToaster from 'store/useToaster';
import { useLabels } from './hooks';
import { InputType } from 'components/Input';

function LabelsEdit() {
  const history = useHistory();
  const { id } = useParams();
  const { labels } = useLabels();
  const { values, setValues, bindInput } = useForm({ name: '', color: '', description: '' });
  const { showToaster } = useToaster();

  const save = async () => {
    try {
      await api.saveLabel(values);
      history.push('/labels');
      showToaster('Label saved!');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id && labels) {
      const label = labels.find((label) => label.id === parseInt(id, 10));
      setValues(label);
    }
  }, [labels]);

  return (
    <Page title="Labels Form">
      <div className="flex justify-between py-4">
        <div></div>
        <div>
          <Button label="Save" onClick={save} />
          <Button label="Cancel" onClick={() => history.push('/labels')} />
        </div>
      </div>
      <div className="w-1/2">
        <Input label="Name" className="mb-2" {...bindInput('name')} />
        <Input label="Description" className="mb-2" {...bindInput('description')} />
        <Input label="Color" type={InputType.color} {...bindInput('color')} />
      </div>
    </Page>
  );
}

export default LabelsEdit;

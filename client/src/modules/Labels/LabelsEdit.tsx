import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Input } from 'components';
import useForm from 'hooks/useForm';
import { useLabels, useLabel } from './hooks';
import { InputType } from 'components/Input';
import Modal, { ModalSize } from 'components/Modal';
import { LinkButton, ButtonType } from 'components/Button';

function LabelsEdit() {
  const { id } = useParams<{ id: string }>();
  const { labels } = useLabels();
  const { values, setValues, bindInput } = useForm({ name: '', color: '', description: '' });
  const { mutate } = useLabel();

  useEffect(() => {
    if (id && labels) {
      const label = labels.find((label) => label.id === parseInt(id, 10));
      setValues(label);
    }
  }, [labels, id, setValues]);

  const modalFooter = () => (
    <>
      <Button label="Save" onClick={() => mutate(values)} className="mr-2" icon="save" />
      <LinkButton label="Cancel" type={ButtonType.Secondary} to="/labels" />
    </>
  );

  return (
    <Modal title="Labels Edit" footer={modalFooter} size={ModalSize.Small}>
      <Input label="Name" className="mb-2" {...bindInput('name')} />
      <Input label="Description" className="mb-2" {...bindInput('description')} />
      <Input label="Color" type={InputType.color} {...bindInput('color')} />
    </Modal>
  );
}

export default LabelsEdit;

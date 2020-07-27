import React from 'react';
import Modal, { ModalSize } from '.';
import Button, { ButtonType } from 'components/Button';

type PropTypes = {
  title?: string;
  children?: any;
  onConfirm: Function;
  onCancel: Function;
};

function ConfirmModal({ title = 'Confirm', children, onConfirm, onCancel }: PropTypes) {
  const modalFooter = () => (
    <>
      <Button label="Confirm" onClick={onConfirm} className="mr-2" />
      <Button label="Cancel" onClick={onCancel} type={ButtonType.Secondary} />
    </>
  );

  return (
    <Modal title={title} size={ModalSize.Small} footer={modalFooter}>
      {children}
    </Modal>
  );
}

export default ConfirmModal;

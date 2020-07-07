import React from 'react';
import style from './style.module.scss';

export enum ModalSize {
  Small = 'Small',
  Regular = 'Regular',
  Large = 'Large',
}

type PropTypes = {
  size?: ModalSize;
  title?: string;
  children?: any;
  footer?: Function;
};

function Modal({ size = ModalSize.Regular, title, children, footer }: PropTypes) {
  const backgroundClass = `fixed top-0 bottom-0 left-0 right-0 z-10 flex items-center justify-center ${style.modalBackground}`;

  return (
    <>
      <div className={backgroundClass}>
        <div className="bg-white rounded shadow-lg w-1/2">
          <div className="bg-white rounded-t border-b-2">
            <h1 className="text-gray-700 text-2xl font-semibold p-4">{title}</h1>
          </div>
          <div className="bg-gray-200 rounded p-6">{children}</div>
          <div className="bg-white rounded-b border-t-2 flex p-4 justify-center">{footer?.()}</div>
        </div>
      </div>
    </>
  );
}

export default Modal;

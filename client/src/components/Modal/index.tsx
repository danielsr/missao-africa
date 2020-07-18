import React from 'react';
import classnames from 'classnames';
import style from './style.module.scss';

export enum ModalSize {
  Small = 'Small',
  Regular = 'Regular',
  Large = 'Large',
  Full = 'Full',
}

type PropTypes = {
  size?: ModalSize;
  title?: string;
  children?: any;
  footer?: Function;
};

function Modal({ size = ModalSize.Regular, title, children, footer }: PropTypes) {
  const backgroundClass = `fixed top-0 bottom-0 left-0 right-0 z-10 flex justify-center items-center ${style.modalBackground}`;
  const modalClass = classnames('bg-white rounded shadow-lg flex flex-col', {
    'w-1/4 h-64': size === ModalSize.Small,
    'w-1/2 h-64': size === ModalSize.Regular,
    'w-4/5 h-64': size === ModalSize.Large,
    'w-full h-full': size === ModalSize.Full,
  });

  return (
    <>
      <div className={backgroundClass}>
        <div className={modalClass}>
          <div className="bg-white rounded-t border-b-2">
            <h1 className="text-gray-700 text-2xl font-semibold p-4">{title}</h1>
          </div>
          <div className="bg-gray-200 rounded p-6 overflow-scroll flex-1">{children}</div>
          <div className="bg-white rounded-b border-t-2 flex p-4 justify-center">{footer?.()}</div>
        </div>
      </div>
    </>
  );
}

export default Modal;

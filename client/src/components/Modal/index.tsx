import React from 'react';
import { Link } from 'react-router-dom';
import './style.scss';
import Icon from 'components/Icon';

export enum ModalSize {
  Auto = 'Auto',
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
  header?: Function;
  closeRoute?: string;
};

function Modal({ size = ModalSize.Auto, title, children, footer, header, closeRoute }: PropTypes) {
  const bodyClass = `modalBody ${size} bg-white rounded shadow-lg flex flex-col`;

  return (
    <div className="modal fixed top-0 bottom-0 left-0 right-0 z-10 flex justify-center items-center">
      <div className={bodyClass}>
        <div className="bg-white rounded-t border-b-2 relative">
          {title && <h1 className="text-gray-700 text-2xl font-semibold p-4">{title}</h1>}
          {header?.()}
          {closeRoute && (
            <div className="absolute right-0 top-0 mt-4 mr-4">
              <Link to={closeRoute}>
                <Icon icon="close" />
              </Link>
            </div>
          )}
        </div>
        <div className="bg-gray-200 rounded p-6 overflow-scroll flex-1">{children}</div>
        {footer && (
          <div className="bg-white rounded-b border-t-2 flex p-4 justify-center">{footer()}</div>
        )}
      </div>
    </div>
  );
}

export default Modal;

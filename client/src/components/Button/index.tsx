import React from 'react';
import classNames from 'classnames';

export enum ButtonType {
  primary = 'primary',
  secondary = 'secondary',
}

type PropTypes = {
  label: string;
  onClick: Function;
  disabled?: boolean;
  className?: string;
  type?: ButtonType;
};

function Button({ label, onClick, disabled, className, type = ButtonType.primary }: PropTypes) {
  const buttonClass = classNames(
    'py-3 px-6 text-white rounded',
    {
      'bg-blue-700 hover:bg-blue-600': type === ButtonType.primary,
    },
    {
      'bg-gray-700 hover:bg-gray-600': type === ButtonType.secondary,
    },
    {
      'opacity-75 cursor-not-allowed': disabled,
    },
    className
  );

  return (
    <button className={buttonClass} onClick={() => onClick()} disabled={disabled}>
      {label}
    </button>
  );
}

export default Button;

import React from 'react';
import classNames from 'classnames';

type ButtonProps = {
  label: string;
  onClick: Function;
  disabled?: boolean;
};

function Button({ label, onClick, disabled }: ButtonProps) {
  const className = classNames(
    'p-2 bg-blue-900 hover:bg-blue-800 text-white rounded mr-2 text-sm',
    {
      'opacity-75 cursor-not-allowed': disabled,
    }
  );

  return (
    <button className={className} onClick={() => onClick()} disabled={disabled}>
      {label}
    </button>
  );
}

export default Button;

import React from 'react';
import classNames from 'classnames';

type ButtonProps = {
  label: string;
  onClick: Function;
  disabled?: boolean;
};

function Button({ label, onClick, disabled }: ButtonProps) {
  const className = classNames('p-2 bg-blue-700 hover:bg-blue-600 text-white rounded text-sm', {
    'opacity-75 cursor-not-allowed': disabled,
  });

  return (
    <button className={className} onClick={() => onClick()} disabled={disabled}>
      {label}
    </button>
  );
}

export default Button;

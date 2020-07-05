import React from 'react';
import classNames from 'classnames';
import Icon from 'components/Icon';

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
  icon?: string;
};

function Button({
  label,
  onClick,
  disabled,
  className,
  type = ButtonType.primary,
  icon,
}: PropTypes) {
  const buttonClass = classNames(
    'h-12 px-4 text-white rounded inline-flex items-center',
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
      {icon && <Icon icon={icon} className="mr-1" />}
      <span>{label}</span>
    </button>
  );
}

export default Button;

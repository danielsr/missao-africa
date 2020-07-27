import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import Icon from 'components/Icon';
import Spinner, { SpinnerSize, SpinnerColor } from 'components/Spinner';

export enum ButtonType {
  Primary = 'Primary',
  Secondary = 'Secondary',
  Warning = 'Warning',
}

type PropTypes = {
  label: string;
  onClick?: Function;
  disabled?: boolean;
  className?: string;
  type?: ButtonType;
  icon?: string;
  to?: string;
  working?: boolean;
};

function Button({
  label,
  onClick,
  disabled,
  className,
  type = ButtonType.Primary,
  icon,
  working,
}: PropTypes) {
  const buttonClass = classNames(
    'h-12 px-4 text-white rounded inline-flex items-center font-semibold',
    {
      'bg-blue-700 hover:bg-blue-600': type === ButtonType.Primary,
    },
    {
      'bg-gray-700 hover:bg-gray-600': type === ButtonType.Secondary,
    },
    {
      'bg-red-700 hover:bg-red-600': type === ButtonType.Warning,
    },
    {
      'opacity-75 cursor-not-allowed': disabled,
    },
    className
  );

  return (
    <button className={buttonClass} onClick={() => onClick?.()} disabled={disabled}>
      {icon && !working && <Icon icon={icon} className="mr-1" />}
      {working && <Spinner size={SpinnerSize.Small} color={SpinnerColor.White} className="mr-1" />}
      <span>{label}</span>
    </button>
  );
}

export const LinkButton = ({ to, ...rest }: PropTypes) => (
  <Link to={to || '#'}>
    <Button {...rest} />
  </Link>
);

export default Button;

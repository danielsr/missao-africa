import React from 'react';
import classNames from 'classnames';
import style from './style.module.scss';

export enum SpinnerSize {
  Regular = 'Regular',
  Small = 'Small',
}

export enum SpinnerColor {
  Gray = 'Gray',
  White = 'White',
}

type PropTypes = {
  size?: SpinnerSize;
  color?: SpinnerColor;
  className?: string;
};

function Spinner({ size = SpinnerSize.Regular, color = SpinnerColor.Gray, className }: PropTypes) {
  const spinnerClass = classNames(
    `rounded-full ${style.spinner}`,
    {
      'w-12 h-12 border-8': size === SpinnerSize.Regular,
    },
    {
      'w-4 h-4 border-4': size === SpinnerSize.Small,
    },
    {
      'border-gray-500': color === SpinnerColor.Gray,
    },
    {
      'border-white': color === SpinnerColor.White,
    },
    className
  );
  return <div className={spinnerClass}></div>;
}

export default Spinner;

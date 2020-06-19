import React from 'react';
import { toDatetimeLocal } from '../util/date';

export enum InputType {
  text = 'text',
  color = 'color',
  datetimeLocal = 'datetime-local',
  password = 'password',
}

type PropTypes = {
  label?: string;
  placeHolder?: string;
  onChange?: Function;
  className?: string;
  value?: string;
  type?: InputType;
  disabled?: boolean;
};

export default function Input({
  label,
  placeHolder,
  onChange,
  className,
  value,
  type = InputType.text,
  disabled = false,
  ...inputProps
}: PropTypes) {
  const inputClass =
    type === InputType.color ? '' : 'border border-gray-400 p-2 text-gray-800 rounded outline-none';
  const formatedValue = type === InputType.datetimeLocal && value ? toDatetimeLocal(value) : value;

  return (
    <div className={`flex flex-col ${className}`}>
      {label && <div className="text-gray-800 mb-1">{label}</div>}
      <input
        type={type}
        className={inputClass}
        placeholder={placeHolder}
        onChange={(e) => onChange?.(e.target.value)}
        value={formatedValue}
        disabled={disabled}
        {...inputProps}
      />
    </div>
  );
}

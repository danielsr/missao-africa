import React from 'react';
import { toDatetimeLocal } from 'util/date';

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
  onBlur?: Function;
  className?: string;
  value?: string;
  type?: InputType;
  disabled?: boolean;
  error?: string;
  touched?: boolean;
};

export default function Input({
  label,
  placeHolder,
  onChange,
  onBlur,
  className,
  value,
  type = InputType.text,
  disabled = false,
  error,
  touched,
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
        onBlur={(e) => onBlur?.(e.target.value)}
        value={formatedValue}
        disabled={disabled}
      />
      {error && touched && <div className="text-red-800 text-sm ml-1 mt-1">{error}</div>}
    </div>
  );
}

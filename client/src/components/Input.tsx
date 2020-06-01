import React from 'react';

type InputProps = {
  label?: string;
  placeHolder?: string;
  onChange?: Function;
  className?: string;
  value?: string;
  type?: string;
};

export default function Input({
  label,
  placeHolder,
  onChange,
  className,
  value,
  type = 'text',
  ...inputProps
}: InputProps) {
  return (
    <div className={`flex flex-col ${className}`}>
      {label && <div className="text-gray-800 mb-1">{label}</div>}
      <input
        type={type}
        className="border border-gray-400 p-2 text-gray-800 rounded outline-none"
        placeholder={placeHolder}
        onChange={(e) => onChange?.(e.target.value)}
        value={value}
        {...inputProps}
      />
    </div>
  );
}

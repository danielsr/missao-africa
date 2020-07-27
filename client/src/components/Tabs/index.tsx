import React from 'react';
import classnames from 'classnames';

export type Tab = {
  name: string;
  label: string;
};

type PropTypes = {
  tabs?: Tab[];
  active?: string;
  onChange?: Function;
  className?: string;
  disabled?: boolean;
};

function Tabs({ tabs, active, onChange, className, disabled }: PropTypes) {
  return (
    <ul className={`flex ${className}`}>
      {tabs?.map(({ name, label }) => (
        <li
          className={classnames(
            'mr-1 rounded-t',
            { 'bg-white': active === name },
            { 'bg-gray-100': active !== name }
          )}
          key={name}
        >
          <span
            className={classnames(
              'inline-block py-2 px-4 font-semibold',
              {
                'border-l border-t border-r rounded-t text-blue-700': active === name,
              },
              {
                'text-blue-500 hover:text-blue-800 cursor-pointer': active !== name,
              }
            )}
            onClick={() => !disabled && onChange?.(name)}
          >
            {label}
          </span>
        </li>
      ))}
    </ul>
  );
}

export default Tabs;

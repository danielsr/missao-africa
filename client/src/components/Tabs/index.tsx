import React from 'react';

export type Tab = {
  name: string;
  label: string;
};

type PropTypes = {
  tabs?: Tab[];
  active?: string;
  onChange?: Function;
};

function Tabs({ tabs, active, onChange }: PropTypes) {
  const liClass = 'mr-1';
  const liClassActive = '-mb-px mr-1';
  const aClass =
    'bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold cursor-pointer';
  const aClassActive =
    'bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 text-blue-700 font-semibold';

  return (
    <ul className="flex border-b">
      {tabs?.map(({ name, label }) => (
        <li className={active === name ? liClassActive : liClass} key={name}>
          <span
            className={active === name ? aClassActive : aClass}
            onClick={() => onChange?.(name)}
          >
            {label}
          </span>
        </li>
      ))}
    </ul>
  );
}

export default Tabs;

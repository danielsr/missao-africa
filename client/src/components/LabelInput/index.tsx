import React, { useState } from 'react';
import { Label } from 'types';
import LabelGroup from 'components/LabelGroup';

type PropTypes = {
  label?: string;
  labels?: Label[];
  value?: string[];
  onChange?: Function;
};

function LabelInput({ label, labels, value, onChange }: PropTypes) {
  const [inputValue, setInputValue] = useState('');

  const onKeyDown = (e) => {
    if (
      e.key === 'Enter' &&
      labels?.find((label) => label.name === inputValue) &&
      !value?.includes(inputValue)
    ) {
      onChange?.(value ? [...value, inputValue] : [inputValue]);
      setInputValue('');
    } else if (e.key === 'Backspace' && inputValue === '') {
      onChange?.(value?.slice(0, value.length - 1));
    }
  };

  return (
    <div className="flex flex-col">
      {label && <div className="text-gray-800 mb-1">{label}</div>}
      <div className="flex items-center border border-gray-400 rounded bg-white p-2">
        <LabelGroup value={value} labels={labels} />
        <input
          className="ml-1 outline-none w-full"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={onKeyDown}
          list="labels"
        />
        <datalist id="labels">
          {labels
            ?.filter(({ name }) => !value?.includes(name))
            .map(({ name }) => (
              <option key={name} value={name}></option>
            ))}
        </datalist>
      </div>
    </div>
  );
}

export default LabelInput;

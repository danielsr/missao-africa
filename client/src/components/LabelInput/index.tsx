import React, { useState } from 'react';
import { Label } from 'types';
import LabelGroup from 'components/LabelGroup';

type PropTypes = {
  labels?: Label[];
  value?: string[];
  onChange?: Function;
};

function LabelInput({ labels, value, onChange }: PropTypes) {
  const [inputValue, setInputValue] = useState('');

  const onKeyDown = (e) => {
    if (e.key === 'Enter' && labels?.find((label) => label.name === inputValue)) {
      onChange?.(value ? [...value, inputValue] : [inputValue]);
      setInputValue('');
    } else if (e.key === 'Backspace' && inputValue === '') {
      onChange?.(value?.slice(0, value.length - 1));
    }
  };

  return (
    <div className="flex items-center border border-gray-400 rounded bg-white p-2">
      <LabelGroup value={value} labels={labels} />
      <input
        className="ml-1 outline-none w-full"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={onKeyDown}
      />
    </div>
  );
}

export default LabelInput;

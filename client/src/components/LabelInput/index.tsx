import React, { useState } from 'react';
import { Label } from 'types';
import LabelGroup from 'components/LabelGroup';
import Input from 'components/Input';

type PropTypes = {
  labels?: Label[];
  value?: string[];
  onChange?: Function;
};

function LabelInput({ labels, value, onChange }: PropTypes) {
  const [inputValue, setInputValue] = useState('');

  const onChangeInput = (newValue) => {
    setInputValue(newValue);

    if (labels?.find((label) => label.name === newValue)) {
      onChange?.(value ? [...value, newValue] : [newValue]);
      setInputValue('');
    }
  };

  return (
    <div className="flex items-center">
      <LabelGroup value={value} labels={labels} />
      <Input
        className="ml-2"
        listOptions={labels?.map((option) => option.name)}
        value={inputValue}
        onChange={onChangeInput}
      />
    </div>
  );
}

export default LabelInput;

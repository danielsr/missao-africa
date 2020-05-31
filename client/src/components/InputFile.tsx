import React from 'react';

type InputFileProps = {
  onChange: Function;
};

function InputFile({ onChange }: InputFileProps) {
  return (
    <div>
      <input type="file" onChange={(e) => onChange(e)} />
    </div>
  );
}

export default InputFile;

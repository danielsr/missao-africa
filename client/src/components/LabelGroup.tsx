import React from 'react';
import LabelComponent from './Label';
import { Label } from '../types';

type props = {
  labels: Label[];
  value?: string[];
};

function LabelGroup({ labels, value }: props) {
  return (
    <div>
      {value?.map((labelName) => {
        const label = labels.find((label) => label.name === labelName);
        return <LabelComponent name={labelName} color={label?.color} />;
      })}
    </div>
  );
}

export default LabelGroup;

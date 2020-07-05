import React from 'react';
import LabelComponent from './Label';
import { Label } from '../types';

type PropTypes = {
  labels: Label[];
  value?: string[];
};

function LabelGroup({ labels, value }: PropTypes) {
  return (
    <div>
      {value?.map((labelName) => {
        const label = labels?.find((label) => label.name === labelName);
        return <LabelComponent name={labelName} color={label?.color} key={labelName} />;
      })}
    </div>
  );
}

export default LabelGroup;

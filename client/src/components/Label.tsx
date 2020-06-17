import React from 'react';

type props = {
  name: string;
  color?: string;
};

function Label({ name, color }: props) {
  return (
    <span className="rounded text-white p-1 text-xs mr-1" style={{ backgroundColor: color }}>
      {name}
    </span>
  );
}

export default Label;

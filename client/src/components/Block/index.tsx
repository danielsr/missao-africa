import React from 'react';

type PropTypes = {
  children: any;
};

function Block({ children }: PropTypes) {
  return <div className="p-6 bg-white rounded shadow-md">{children}</div>;
}

export default Block;

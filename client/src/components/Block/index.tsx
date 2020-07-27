import React from 'react';

type PropTypes = {
  children: any;
  className?: string;
};

function Block({ children, className }: PropTypes) {
  return <div className={`p-6 bg-white rounded shadow-md ${className}`}>{children}</div>;
}

export default Block;

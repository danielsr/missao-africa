import React from 'react';
import { LinkButton } from 'components/Button';

type PropTypes = {
  children: any;
  title: string;
  newLabel?: string;
  newRoute?: string;
};

function Page({ children, title, newRoute, newLabel }: PropTypes) {
  return (
    <div className="mt-20 ml-64 w-full bg-gray-200 px-12 py-8">
      <div className="flex justify-between">
        <h3 className="text-gray-700 text-3xl font-semibold mb-4">{title}</h3>
        {newLabel && <LinkButton icon="add" label={newLabel} to={newRoute} />}
      </div>
      {children}
    </div>
  );
}

export default Page;

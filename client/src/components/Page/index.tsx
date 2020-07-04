import React from 'react';

type PropTypes = {
  children: any;
  title: string;
};

function Page({ children, title }: PropTypes) {
  return (
    <div className="mt-20 ml-64 w-full bg-gray-200 px-12 py-8">
      <h3 className="text-gray-700 text-3xl font-semibold mb-4">{title}</h3>
      {children}
    </div>
  );
}

export default Page;

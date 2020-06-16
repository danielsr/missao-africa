import React from 'react';

type PropTypes = {
  text?: string;
};

function Toaster({ text }: PropTypes) {
  return (
    <div className="bg-gray-800 fixed bottom-0 right-0 mr-8 mb-8 px-4 py-2 rounded text-white">
      {text}
    </div>
  );
}

export default Toaster;

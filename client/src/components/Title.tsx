import React from 'react';

type TitleProps = {
  title: string;
};

function Title({ title }: TitleProps) {
  return <h3 className="text-gray-700 text-3xl font-semibold">{title}</h3>;
}

export default Title;

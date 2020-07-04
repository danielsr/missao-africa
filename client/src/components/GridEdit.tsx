import React from 'react';
import Grid, { GridProps } from './Grid';
import { Link } from 'react-router-dom';

interface GridEditProps extends GridProps {
  editRoute: string;
}

export default function GridEdit({ data, fields, editRoute }: GridEditProps) {
  const editGridFields = [
    ...fields,
    {
      name: 'edit',
      label: 'Edit',
      renderFunction(row) {
        return (
          <Link className="text-indigo-600 hover:text-indigo-900" to={`${editRoute}/${row.id}`}>
            Edit
          </Link>
        );
      },
    },
  ];
  return <Grid data={data} fields={editGridFields} />;
}

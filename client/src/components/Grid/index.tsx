import React from 'react';
import { Link } from 'react-router-dom';

export type GridField = {
  name: string;
  label: string;
  align?: string;
  linkTo?: Function;
  renderFunction?: Function;
};

export interface GridProps {
  fields: GridField[];
  data: any[];
}

function Header({ fields }: { fields: GridField[] }) {
  return (
    <thead>
      <tr>
        {fields.map((field) => (
          <th
            key={`Grid_Header_${field.name}`}
            className="px-6 py-3 border-b border-gray-200 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
          >
            {field.label}
          </th>
        ))}
      </tr>
    </thead>
  );
}

function Body({ fields, data }: { fields: GridField[]; data: any[] }) {
  const renderField = (field, row) => {
    if (field.renderFunction) {
      return field.renderFunction(row);
    }
    if (field.linkTo) {
      return (
        <Link className="text-blue-700" to={field.linkTo(row)}>
          {row[field.name]}
        </Link>
      );
    }
    return row[field.name];
  };

  return (
    <tbody className="bg-white">
      {data.map((row, index) => (
        <tr key={`Grid_Row_${index}`}>
          {fields.map((field) => (
            <td
              key={`Grid_Row_${index}_${field.name}`}
              className="px-6 py-4 truncate border-b border-gray-200"
            >
              {renderField(field, row)}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}

function Grid({ fields, data }: GridProps) {
  return (
    <div className="align-middle inline-block w-full shadow overflow-hidden rounded border-b border-gray-200 text-gray-900 text-sm">
      <table className="w-full">
        <Header fields={fields} />
        <Body fields={fields} data={data} />
      </table>
    </div>
  );
}

export default Grid;

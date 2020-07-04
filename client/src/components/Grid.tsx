import React from 'react';

export type GridField = {
  name: string;
  label: string;
  align?: string;
  renderFunction?: Function;
};

export interface GridProps {
  fields: GridField[];
  data: any[];
}

function renderHeader(fields: GridField[]) {
  return (
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
  );
}

function renderRows(fields: GridField[], data: any[]) {
  return data.map((row, index) => (
    <tr key={`Grid_Row_${index}`}>
      {fields.map((field) => (
        <td
          key={`Grid_Row_${index}_${field.name}`}
          className="px-6 py-4 whitespace-no-wrap border-b border-gray-200"
        >
          {field.renderFunction ? field.renderFunction(row) : row[field.name]}
        </td>
      ))}
    </tr>
  ));
}

function Grid({ fields, data }: GridProps) {
  return (
    <div className="align-middle inline-block min-w-full shadow overflow-hidden rounded border-b border-gray-200 text-gray-900 text-sm">
      <table className="min-w-full">
        <thead>{renderHeader(fields)}</thead>
        <tbody className="bg-white">{renderRows(fields, data)}</tbody>
      </table>
    </div>
  );
}

export default Grid;

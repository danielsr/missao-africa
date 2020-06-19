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
        <th key={`Grid_Header_${field.name}`} className="text-left p-1">
          {field.label}
        </th>
      ))}
    </tr>
  );
}

function renderRows(fields: GridField[], data: any[]) {
  return data.map((row, index) => (
    <tr key={`Grid_Row_${index}`} className="border-b border-gray-600 hover:bg-gray-400">
      {fields.map((field) => (
        <td key={`Grid_Row_${index}_${field.name}`} className="text-left p-1">
          {field.renderFunction ? field.renderFunction(row) : row[field.name]}
        </td>
      ))}
    </tr>
  ));
}

function Grid({ fields, data }: GridProps) {
  return (
    <table className="table-auto text-sm w-full">
      <thead>{renderHeader(fields)}</thead>
      <tbody>{renderRows(fields, data)}</tbody>
    </table>
  );
}

export default Grid;

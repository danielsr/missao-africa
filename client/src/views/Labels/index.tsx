import React, { useEffect } from 'react';
import { GridField } from '../../components/Grid';
import { Title, GridEdit } from '../../components';
import useLabels from './useLabels';

function Labels() {
  const { labels, loadLabels } = useLabels();
  const fields: GridField[] = [
    {
      name: 'name',
      label: 'Label',
      renderFunction(row) {
        return (
          <span className="rounded text-white p-1 text-xs" style={{ backgroundColor: row.color }}>
            {row.name}
          </span>
        );
      },
    },
    { name: 'description', label: 'Description' },
  ];

  useEffect(() => {
    loadLabels();
  }, []);

  return (
    <div>
      <Title title="Labels" />
      {labels && labels.length > 0 && (
        <GridEdit data={labels} fields={fields} editRoute="/labels-edit" />
      )}
    </div>
  );
}

export default Labels;

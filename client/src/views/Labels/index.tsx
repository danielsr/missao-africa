import React, { useEffect } from 'react';
import { GridField } from '../../components/Grid';
import { Title, GridEdit } from '../../components';
import useLabels from './useLabels';
import Label from '../../components/Label';

function Labels() {
  const { labels, loadLabels } = useLabels();
  const fields: GridField[] = [
    {
      name: 'name',
      label: 'Label',
      renderFunction(row) {
        return <Label name={row.name} color={row.color} />;
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

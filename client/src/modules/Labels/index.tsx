import React, { useEffect } from 'react';
import { GridField } from 'components/Grid';
import { Page, GridEdit } from 'components';
import { useLabels } from './hooks';
import Label from 'components/Label';

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
    <Page title="Labels" newLabel="New Label" newRoute="/labels/0">
      {labels && labels.length > 0 && (
        <GridEdit data={labels} fields={fields} editRoute="/labels" />
      )}
    </Page>
  );
}

export default Labels;

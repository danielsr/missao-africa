import React, { useEffect } from 'react';
import { GridField } from 'components/Grid';
import { Page, Grid } from 'components';
import { useLabels } from './hooks';
import Label from 'components/Label';
import { Link } from 'react-router-dom';

function Labels() {
  const { labels, loadLabels } = useLabels();
  const fields: GridField[] = [
    {
      name: 'name',
      label: 'Label',
      renderFunction: (row) => (
        <Link to={`/labels/${row.id}`}>
          <Label name={row.name} color={row.color} />
        </Link>
      ),
    },
    { name: 'description', label: 'Description' },
  ];

  useEffect(() => {
    loadLabels();
  }, [loadLabels]);

  return (
    <Page title="Labels" newLabel="New Label" newRoute="/labels/0">
      {labels && labels.length > 0 && <Grid data={labels} fields={fields} />}
    </Page>
  );
}

export default Labels;

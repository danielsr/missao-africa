import React from 'react';
import { format as formatCpf } from '@fnando/cpf';
import { Page, Grid, InfiniteScroll } from 'components';
// import SearchInput from 'components/SearchInput';
import { GridField } from 'components/Grid';
import LabelGroup from 'components/LabelGroup';
import { useLabels } from 'modules/Labels/hooks';
import { usePeople } from './hooks';

function People() {
  const { labels } = useLabels();
  const fields: GridField[] = [
    { name: 'name', label: 'Name', linkTo: (row) => `/people/${row.id}` },
    { name: 'email', label: 'Email' },
    { name: 'cpf', label: 'CPF', renderFunction: (row) => formatCpf(row.cpf) },
    {
      name: 'labels',
      label: 'Labels',
      renderFunction: (row) => labels && <LabelGroup value={row.labels} labels={labels} />,
    },
  ];
  const { people, fetchNextPage, isFetching, hasNextPage } = usePeople();

  return (
    <Page title="People" newLabel="New Person" newRoute="/people/0">
      {/* <SearchInput placeHolder="Search people..." className="w-1/2 mb-4" onSearch={loadPeople} /> */}
      {people && <Grid data={people} fields={fields} />}
      <InfiniteScroll hasMore={hasNextPage} isLoading={isFetching} loadMore={fetchNextPage} />
    </Page>
  );
}

export default People;

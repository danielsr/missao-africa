import React, { useEffect } from 'react';
import { format as formatCpf } from '@fnando/cpf';
import { Page, Input, Grid, InfiniteScroll } from 'components';
import { GridField } from 'components/Grid';
import LabelGroup from 'components/LabelGroup';
import useSearch from 'hooks/useSearch';
import { useLabels } from 'modules/Labels/hooks';
import { usePeople } from './hooks';

function People() {
  const { labels, loadLabels } = useLabels();
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
  const { setSearch, search, debouncedSearch } = useSearch();
  const { people, loadPeople, loadMore, pagination, isLoading } = usePeople();

  useEffect(() => {
    loadLabels();
  }, []);

  useEffect(() => {
    loadPeople(debouncedSearch);
  }, [debouncedSearch]);

  return (
    <Page title="People" newLabel="New Person" newRoute="/people/0">
      <Input
        placeHolder="Search people..."
        className="w-1/2 mb-4"
        value={search}
        onChange={setSearch}
      />
      {people && <Grid data={people} fields={fields} />}
      {pagination && (
        <InfiniteScroll hasMore={pagination.hasMore} isLoading={isLoading} loadMore={loadMore} />
      )}
    </Page>
  );
}

export default People;

import React, { useEffect } from 'react';
import { Page, Input, GridEdit, InfiniteScroll } from 'components';
import { GridField } from 'components/Grid';
import LabelGroup from 'components/LabelGroup';
import useFetch from 'hooks/useFetch';
import useSearch from 'hooks/useSearch';
import usePagination from 'hooks/usePagination';
import { Person } from 'types';
import api from 'services/api';
import { useLabels } from 'modules/Labels/hooks';
import PeopleEdit from './PeopleEdit';

function People() {
  const { labels } = useLabels();
  const fields: GridField[] = [
    { name: 'name', label: 'Name' },
    { name: 'email', label: 'Email' },
    { name: 'cpf', label: 'CPF' },
    {
      name: 'labels',
      label: 'Labels',
      renderFunction(row) {
        return labels && <LabelGroup value={row.labels} labels={labels} />;
      },
    },
  ];
  const [people, fetchPeople] = useFetch(api.getPeople);
  const { data, isLoading } = people;
  const { nextPage, resetPagination, pageIndex, hasMore, items } = usePagination<Person>(data);
  const { setSearch, search, debouncedSearch } = useSearch(resetPagination);

  useEffect(() => {
    fetchPeople(debouncedSearch, pageIndex);
  }, [debouncedSearch, pageIndex, fetchPeople]);

  return (
    <Page title="People" newLabel="New Person" newRoute="/people-edit/0">
      <Input
        placeHolder="Search people..."
        className="w-1/2 mb-4"
        value={search}
        onChange={setSearch}
      />
      {items && <GridEdit data={items} fields={fields} editRoute="/people-edit" />}
      <InfiniteScroll hasMore={hasMore} isLoading={isLoading} loadMore={nextPage} />
      <PeopleEdit />
    </Page>
  );
}

export default People;

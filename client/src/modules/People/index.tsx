import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Page, Input, GridEdit, InfiniteScroll } from 'components';
import { GridField } from 'components/Grid';
import LabelGroup from 'components/LabelGroup';
import useFetch from 'hooks/useFetch';
import useSearch from 'hooks/useSearch';
import usePagination from 'hooks/usePagination';
import { Person } from 'types';
import api from 'services/api';
import { useLabels } from 'modules/Labels/hooks';

function People() {
  const { labels } = useLabels();
  const history = useHistory();
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
  const { setSearch, search, debouncedSearch } = useSearch();
  const { nextPage, setPageIndex, pageIndex, hasMore, items } = usePagination<Person>(data);

  useEffect(() => {
    setPageIndex(1);
  }, [debouncedSearch, setPageIndex]);

  useEffect(() => {
    fetchPeople(debouncedSearch, pageIndex);
  }, [debouncedSearch, pageIndex, fetchPeople]);

  return (
    <Page title="People">
      <div className="flex justify-between py-4">
        <div className="flex-1">
          <Input
            placeHolder="Search people..."
            className="w-1/2"
            value={search}
            onChange={setSearch}
          />
        </div>
        <div>
          <Button icon="add" label="New Person" onClick={() => history.push('/people-edit/0')} />
        </div>
      </div>
      {items && <GridEdit data={items} fields={fields} editRoute="/people-edit" />}
      <InfiniteScroll hasMore={hasMore} isLoading={isLoading} loadMore={nextPage} />
    </Page>
  );
}

export default People;

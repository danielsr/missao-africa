import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Title, Input, GridEdit, InfiniteScroll } from '../../components';
import { GridField } from '../../components/Grid';
import useFetch from '../../hooks/useFetch';
import useSearch from '../../hooks/useSearch';
import usePagination from '../../hooks/usePagination';
import { Sponsor } from '../../types';
import api from '../../services/api';

function Sponsors() {
  const history = useHistory();
  const fields: GridField[] = [
    { name: 'name', label: 'Name' },
    { name: 'email', label: 'Email' },
  ];
  const [sponsors, fetchSponsors] = useFetch(api.getSponsors);
  const { data, isLoading } = sponsors;
  const { setSearch, search, debouncedSearch } = useSearch();
  const { nextPage, setPageIndex, pageIndex, hasMore, items } = usePagination<Sponsor>(data);

  useEffect(() => {
    setPageIndex(1);
  }, [debouncedSearch, setPageIndex]);

  useEffect(() => {
    fetchSponsors(debouncedSearch, pageIndex);
  }, [debouncedSearch, pageIndex, fetchSponsors]);

  return (
    <div>
      <Title title="Sponsors" />
      <div className="flex justify-between py-4">
        <div className="flex-1">
          <Input
            placeHolder="Search sponsors..."
            className="w-1/2"
            value={search}
            onChange={setSearch}
          />
        </div>
        <div>
          <Button label="New Sponsor" onClick={() => history.push('/sponsors-edit/0')} />
          <Button label="Import Sponsors" onClick={() => history.push('/sponsors-import')} />
        </div>
      </div>
      {items && <GridEdit data={items} fields={fields} editRoute="/sponsors-edit" />}
      <InfiniteScroll hasMore={hasMore} isLoading={isLoading} loadMore={nextPage} />
    </div>
  );
}

export default Sponsors;

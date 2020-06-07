import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Title, Input, GridEdit, InfiniteScroll } from '../../components';
import { GridField } from '../../components/Grid';
import { useFetch } from '../../hooks';
import api from '../../services/api';
import { Sponsor } from '../../types';
import { useStore } from '../../store';
import { UserActionTypes } from '../../store/user';

function Sponsors() {
  const { dispatch } = useStore();
  const history = useHistory();
  const { items, setSearch, search, loadMore, hasMore, isLoading } = useFetch<Sponsor>(
    api.getSponsors
  );
  const fields: GridField[] = [
    { name: 'name', label: 'Name' },
    { name: 'email', label: 'Email' },
  ];

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
          <Button
            label="Set user"
            onClick={() => dispatch({ type: UserActionTypes.Set, user: { name: 'Daniel...' } })}
          />
          <Button label="New Sponsor" onClick={() => history.push('/sponsors-edit/0')} />
          <Button label="Import Sponsors" onClick={() => history.push('/sponsors-import')} />
        </div>
      </div>
      {items.length > 0 && <GridEdit data={items} fields={fields} editRoute="/sponsors-edit" />}
      <InfiniteScroll hasMore={hasMore} isLoading={isLoading} loadMore={loadMore} />
    </div>
  );
}

export default Sponsors;

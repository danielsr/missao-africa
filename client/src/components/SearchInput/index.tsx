import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDebounce } from 'hooks';
import useQuery from 'hooks/useQuery';
import { Input } from 'components';

type PropTypes = {
  placeHolder: string;
  onSearch: Function;
  className?: string;
};

function SearchInput({ placeHolder, onSearch, className }: PropTypes) {
  const history = useHistory();
  const query = useQuery();
  const searchQuery = query.get('search') || '';
  const [search, setSearch]: [string, Function] = useState(searchQuery);
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    history.replace(`?search=${debouncedSearch}`);
    onSearch(debouncedSearch);
  }, [debouncedSearch, history]);

  return (
    <Input placeHolder={placeHolder} className={className} value={search} onChange={setSearch} />
  );
}

export default SearchInput;

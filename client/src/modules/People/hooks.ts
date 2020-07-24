import { useStore } from 'store';
import { PeopleActionTypes } from './state';
import api from 'services/api';
import { Pagination } from 'types';

function getPagination(pagination): Pagination {
  const { pageIndex, pageSize, totalCount } = pagination;
  const lastPage = totalCount / pageSize;
  const hasMore = lastPage > pageIndex;

  return { pageIndex, pageSize, totalCount, hasMore };
}

export function usePeople() {
  const [state, dispatch] = useStore();

  const setLoading = (isLoading) => {
    dispatch({ type: PeopleActionTypes.SetLoading, payload: { isLoading } });
  };

  const loadPeople = async (search = '', pageIndex = 1, append = false) => {
    try {
      setLoading(true);
      const { data } = await api.getPeople(search, pageIndex);
      const { items, ...rest } = data;
      dispatch({
        type: append ? PeopleActionTypes.Append : PeopleActionTypes.Load,
        payload: { people: items },
      });
      const pagination = getPagination(rest);
      dispatch({ type: PeopleActionTypes.SetPagination, payload: { pagination } });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    const nextPage = (state.people.pagination?.pageIndex || 1) + 1;
    loadPeople('', nextPage, true);
  };

  const updatePerson = (person) => {
    const index = state.people.people?.findIndex(({ id }) => id === person.id);
    if (index && state.people.people) {
      const people = [
        ...state.people.people.slice(0, index),
        person,
        ...state.people.people.slice(index + 1),
      ];
      dispatch({ type: PeopleActionTypes.Load, payload: { people } });
    }
  };

  return {
    people: state.people.people,
    pagination: state.people.pagination,
    isLoading: state.people.isLoading,
    loadPeople,
    loadMore,
    updatePerson,
  };
}

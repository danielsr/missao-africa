import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useStore } from 'store';
import { PeopleActionTypes } from './state';
import api from 'services/api';
import { Pagination, Person } from 'types';
import { useToaster } from 'store/toaster/hooks';

function getPagination(pagination): Pagination {
  const { pageIndex, pageSize, totalCount } = pagination;
  const lastPage = totalCount / pageSize;
  const hasMore = lastPage > pageIndex;

  return { pageIndex, pageSize, totalCount, hasMore };
}

export function usePeople() {
  const history = useHistory();
  const [state, dispatch] = useStore();
  const { showToaster } = useToaster();
  const { people, isLoading, isSaving, pagination, person, search } = state.people;

  const setLoading = useCallback(
    (isLoading) => {
      dispatch({ type: PeopleActionTypes.SetLoading, payload: { isLoading } });
    },
    [dispatch]
  );

  const setSaving = (isSaving) => {
    dispatch({ type: PeopleActionTypes.SetSaving, payload: { isSaving } });
  };

  const loadPeople = useCallback(
    (search = '', pageIndex = 1, append = false) => {
      const load = async () => {
        try {
          setLoading(true);
          const { data } = await api.getPeople(search, pageIndex);
          const { items, ...rest } = data;
          dispatch({
            type: append ? PeopleActionTypes.Append : PeopleActionTypes.Load,
            payload: { people: items },
          });
          dispatch({ type: PeopleActionTypes.SetSearch, payload: { search } });
          const pagination = getPagination(rest);
          dispatch({ type: PeopleActionTypes.SetPagination, payload: { pagination } });
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      };
      load();
    },
    [dispatch, setLoading]
  );

  const loadMore = () => {
    const nextPage = (pagination?.pageIndex || 1) + 1;
    loadPeople(search, nextPage, true);
  };

  const updatePerson = (person: Person) => {
    const index = people?.findIndex(({ id }) => id === person.id);
    if (index && people) {
      const payload = { people: [...people.slice(0, index), person, ...people.slice(index + 1)] };
      dispatch({ type: PeopleActionTypes.Load, payload });
    }
  };

  const savePerson = async (values: Person) => {
    try {
      setSaving(true);
      const { data: person } = await api.savePerson(values);
      updatePerson(person);
      history.push('/people');
      showToaster('People saved!');
    } catch (error) {
      console.log(error);
    } finally {
      setSaving(false);
    }
  };

  const loadPerson = useCallback(
    (id: number) => {
      const load = async () => {
        try {
          setLoading(true);
          const { data: person } = await api.getPerson(id);
          dispatch({ type: PeopleActionTypes.SetPerson, payload: { person } });
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      };
      load();
    },
    [dispatch, setLoading]
  );

  return {
    people,
    person,
    pagination,
    isLoading,
    isSaving,
    loadPeople,
    loadMore,
    savePerson,
    loadPerson,
  };
}

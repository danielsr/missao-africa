import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useStore } from 'store';
import { PeopleActionTypes } from './state';
import api from 'services/api';
import { Person } from 'types';
import { useToaster } from 'store/toaster/hooks';
import { getPagination } from 'lib';

export function usePeople() {
  const [state, dispatch] = useStore();
  const { people, isLoading, pagination, search } = state.people;

  const setLoading = useCallback(
    (isLoading) => {
      dispatch({ type: PeopleActionTypes.SetLoading, payload: { isLoading } });
    },
    [dispatch]
  );

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

  return {
    people,
    pagination,
    isLoading,
    loadPeople,
    loadMore,
  };
}

export function usePerson() {
  const history = useHistory();
  const [state, dispatch] = useStore();
  const { showToaster } = useToaster();
  const { isLoading, isSaving, pagination, person } = state.people;

  const setLoading = useCallback(
    (isLoading) => {
      dispatch({ type: PeopleActionTypes.SetLoading, payload: { isLoading } });
    },
    [dispatch]
  );

  const setSaving = (isSaving) => {
    dispatch({ type: PeopleActionTypes.SetSaving, payload: { isSaving } });
  };

  const updatePeople = (personUpdated: Person) => {
    dispatch({ type: PeopleActionTypes.UpdatePeople, payload: { person: personUpdated } });
  };

  const savePerson = async (values: Person) => {
    try {
      setSaving(true);
      const { data: personUpdated } = await api.savePerson(values);
      updatePeople(personUpdated);
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
    person,
    pagination,
    isLoading,
    isSaving,
    savePerson,
    loadPerson,
  };
}

import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useInfiniteQuery } from 'react-query';
import { useStore } from 'store';
import { PeopleActionTypes } from './state';
import api from 'services/api';
import { Person } from 'types';
import { useToaster } from 'store/toaster/hooks';

export function usePeople() {
  const { data, isFetching, fetchNextPage, hasNextPage } = useInfiniteQuery(
    'people',
    async ({ pageParam = 1 }) => {
      const res = await api.getPeople('', pageParam);
      return res.data;
    },
    {
      getNextPageParam: ({ pageSize, pageIndex }) => {
        return pageIndex < pageSize ? pageIndex + 1 : false;
      },
    }
  );

  return {
    people: data?.pages.flatMap((item) => item.items),
    isFetching,
    fetchNextPage,
    hasNextPage: hasNextPage || false,
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

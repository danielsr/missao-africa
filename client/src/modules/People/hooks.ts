import { useStore } from 'store';
import { PeopleActionTypes } from './state';
import api from 'services/api';
import { Pagination, Person } from 'types';
import { useHistory } from 'react-router-dom';
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
  const { people, isLoading, isSaving, pagination } = state.people;

  const setLoading = (isLoading) => {
    dispatch({ type: PeopleActionTypes.SetLoading, payload: { isLoading } });
  };

  const setSaving = (isSaving) => {
    dispatch({ type: PeopleActionTypes.SetSaving, payload: { isSaving } });
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
    const nextPage = (pagination?.pageIndex || 1) + 1;
    loadPeople('', nextPage, true);
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

  const getPerson = async (id: number) => {
    try {
      setLoading(true);
      const { data } = await api.getPerson(id);
      return data;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    people,
    pagination,
    isLoading,
    isSaving,
    loadPeople,
    loadMore,
    savePerson,
    getPerson,
  };
}

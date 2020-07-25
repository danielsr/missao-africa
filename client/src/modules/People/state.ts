import { Person, Pagination } from 'types';
import { getUpdatedArray } from 'lib';

export type PeopleState = {
  people?: Person[];
  isLoading: boolean;
  isSaving: boolean;
  pagination?: Pagination;
  person?: Person;
  search?: string;
};

export const peopleInitialState: PeopleState = { isLoading: false, isSaving: false };

export enum PeopleActionTypes {
  Load = 'PEOPLE/LOAD',
  Append = 'PEOPLE/APPEND',
  SetLoading = 'PEOPLE/SET_LOADING',
  SetSaving = 'PEOPLE/SET_SAVING',
  SetPagination = 'PEOPLE/SET_PAGINATION',
  SetPerson = 'PEOPLE/SET_PERSON',
  SetSearch = 'PEOPLE/SET_SEARCH',
  UpdatePeople = 'PEOPLE/UPDATE_PEOPLE',
}

export const peopleReducer = (state: PeopleState, action) => {
  const { payload } = action;
  switch (action.type) {
    case PeopleActionTypes.Load:
      return { ...state, people: payload.people };
    case PeopleActionTypes.Append:
      return {
        ...state,
        people: state.people ? [...state.people, ...payload.people] : payload.people,
      };
    case PeopleActionTypes.SetLoading:
      return { ...state, isLoading: payload.isLoading };
    case PeopleActionTypes.SetSaving:
      return { ...state, isSaving: payload.isSaving };
    case PeopleActionTypes.SetPagination:
      return { ...state, pagination: payload.pagination };
    case PeopleActionTypes.SetPerson:
      return { ...state, person: payload.person };
    case PeopleActionTypes.SetSearch:
      return { ...state, search: payload.search };
    case PeopleActionTypes.UpdatePeople:
      return {
        ...state,
        people: state.people && getUpdatedArray<Person>(state.people, payload.person),
      };
    default:
      return state;
  }
};

import { Person, Pagination } from 'types';

export type PeopleState = {
  people?: Person[];
  isLoading: boolean;
  pagination?: Pagination;
};

export const peopleInitialState: PeopleState = { isLoading: false };

export enum PeopleActionTypes {
  Load = 'PEOPLE/LOAD',
  Append = 'PEOPLE/APPEND',
  SetLoading = 'PEOPLE/SET_LOADING',
  SetPagination = 'PEOPLE/SET_PAGINATION',
}

export const peopleReducer = (state, action) => {
  const { payload } = action;
  switch (action.type) {
    case PeopleActionTypes.Load:
      return { ...state, people: payload.people };
    case PeopleActionTypes.Append:
      return { ...state, people: [...state.people, ...payload.people] };
    case PeopleActionTypes.SetLoading:
      return { ...state, isLoading: payload.isLoading };
    case PeopleActionTypes.SetPagination:
      return { ...state, pagination: payload.pagination };
    default:
      return state;
  }
};
import { User } from 'types';
import { getUser } from 'services/auth';

export type UserState = {
  user?: User;
};

export const initialState: UserState = {
  user: getUser(),
};

export enum UserActionTypes {
  Set = 'USER/SET',
}

export const userReducer = (state, action) => {
  switch (action.type) {
    case UserActionTypes.Set:
      return { ...state, user: action.user };
    default:
      return state;
  }
};

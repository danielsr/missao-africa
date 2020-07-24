import { User } from 'types';
import { getUser } from 'services/auth';

export type UserState = {
  user?: User;
};

export const userInitialState: UserState = {
  user: getUser(),
};

export enum UserActionTypes {
  Set = 'USER/SET',
}

export const userReducer = (state, action) => {
  const { payload } = action;
  switch (action.type) {
    case UserActionTypes.Set:
      return { ...state, user: payload.user };
    default:
      return state;
  }
};

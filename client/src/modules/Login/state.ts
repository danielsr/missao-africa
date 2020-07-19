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

export const userActions = {
  [UserActionTypes.Set]: (state, { user }) => ({ ...state, user: { user } }),
};

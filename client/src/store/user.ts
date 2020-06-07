type User = {
  name: string;
};

type UserState = {
  user?: User;
};

export const userState: UserState = {};

export enum UserActionTypes {
  Set = 'SET_USER',
}

export const userActions = {
  [UserActionTypes.Set]: (state, { user }) => ({ ...state, user }),
};

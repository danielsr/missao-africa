import React, { createContext, useContext, useReducer, Dispatch } from 'react';
import { userState, userActions } from './user';

const initialState = { ...userState };

const actions = { ...userActions };

const reducer = (state, action) => {
  return actions[action.type]?.(state, action) ?? state;
};

const StoreContext = createContext<{
  state: any;
  dispatch: Dispatch<any>;
}>({ state: {}, dispatch: () => null });

export const StoreProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <StoreContext.Provider value={{ state, dispatch }}>{children}</StoreContext.Provider>;
};

export const useStore = () => useContext(StoreContext);

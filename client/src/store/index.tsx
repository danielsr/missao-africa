import React, { createContext, useContext, useReducer, Dispatch } from 'react';
import { initialState as toaster, toasterReducer } from './toaster';
import { initialState as labels, labelsReducer } from './labels';
import { initialState as user, userReducer } from 'modules/Login/state';

const initialState = { toaster, labels, user };

const reducer = (state, action) => {
  const reducers = {
    toaster: toasterReducer,
    labels: labelsReducer,
    user: userReducer,
  };

  return Object.keys(reducers).reduce((res, key) => {
    return { ...res, [key]: reducers[key](res[key], action) };
  }, state);
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

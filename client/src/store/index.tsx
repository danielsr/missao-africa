import React, { createContext, useContext, useReducer, Dispatch } from 'react';
import { initialState as toaster, toasterActions } from './toaster';

const initialState = { toaster };

const actions = { ...toasterActions };

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

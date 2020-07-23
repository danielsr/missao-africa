import React, { createContext, useContext, useReducer, Dispatch } from 'react';
import { toasterInitialState, toasterReducer, ToasterState } from './toaster';
import { labelsInitialState, labelsReducer, LabelsState } from './labels';
import { userInitialState, userReducer, UserState } from 'modules/Login/state';
import { combineReducers } from './helper';

type State = {
  toaster: ToasterState;
  labels: LabelsState;
  user: UserState;
};

const rootState: State = {
  toaster: toasterInitialState,
  labels: labelsInitialState,
  user: userInitialState,
};

const rootReducer = combineReducers({
  toaster: toasterReducer,
  labels: labelsReducer,
  user: userReducer,
});

const StoreContext = createContext<{
  state: any;
  dispatch: Dispatch<any>;
}>({ state: {}, dispatch: () => null });

export const StoreProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(rootReducer, rootState);

  return <StoreContext.Provider value={{ state, dispatch }}>{children}</StoreContext.Provider>;
};

export const useStore = () => useContext(StoreContext);

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

const StoreContext = createContext({} as [State, Dispatch<any>]);

export const StoreProvider = ({ children }: any) => {
  return (
    <StoreContext.Provider value={useReducer(rootReducer, rootState)}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);

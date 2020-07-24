import React, { createContext, useContext, useReducer, Dispatch } from 'react';
import { toasterInitialState, toasterReducer, ToasterState, ToasterActionTypes } from './toaster';
import {
  labelsInitialState,
  labelsReducer,
  LabelsState,
  LabelsActionTypes,
} from 'modules/Labels/state';
import {
  peopleInitialState,
  peopleReducer,
  PeopleState,
  PeopleActionTypes,
} from 'modules/People/state';
import { userInitialState, userReducer, UserState, UserActionTypes } from './user';
import { combineReducers } from './helper';

type State = {
  toaster: ToasterState;
  labels: LabelsState;
  user: UserState;
  people: PeopleState;
};

interface ActionTypes {
  type: LabelsActionTypes | UserActionTypes | ToasterActionTypes | PeopleActionTypes;
  payload?: any;
}

const rootState: State = {
  toaster: toasterInitialState,
  labels: labelsInitialState,
  user: userInitialState,
  people: peopleInitialState,
};

const rootReducer = combineReducers({
  toaster: toasterReducer,
  labels: labelsReducer,
  user: userReducer,
  people: peopleReducer,
});

const StoreContext = createContext({} as [State, Dispatch<ActionTypes>]);

export const StoreProvider = ({ children }: any) => {
  return (
    <StoreContext.Provider value={useReducer(rootReducer, rootState)}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);

import { Label } from '../types';

export type LabelsState = {
  labels?: Label[];
};

export const labelsInitialState: LabelsState = {};

export enum LabelsActionTypes {
  Load = 'LABELS/LOAD',
}

export const labelsReducer = (state, action) => {
  switch (action.type) {
    case LabelsActionTypes.Load:
      return { ...state, labels: action.labels };
    default:
      return state;
  }
};

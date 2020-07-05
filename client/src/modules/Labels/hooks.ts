import { useStore } from '../../store';
import { LabelsActionTypes } from '../../store/labels';
import api from 'services/api';
import { Label } from 'types';

export function useLabels(): { labels: Label[]; loadLabels: Function } {
  const { state, dispatch } = useStore();

  const loadLabels = async () => {
    try {
      const { data } = await api.getLabels();
      dispatch({ type: LabelsActionTypes.Load, labels: data });
    } catch (error) {
      console.log(error);
    }
  };

  return {
    labels: state.labels.labels,
    loadLabels,
  };
}
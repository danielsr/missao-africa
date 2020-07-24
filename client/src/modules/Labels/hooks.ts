import { useCallback } from 'react';
import { useStore } from 'store';
import { LabelsActionTypes } from './state';
import api from 'services/api';
import { Label } from 'types';

export function useLabels(): { labels?: Label[]; loadLabels: Function } {
  const [state, dispatch] = useStore();

  const loadLabels = useCallback(() => {
    const load = async () => {
      try {
        const { data } = await api.getLabels();
        dispatch({ type: LabelsActionTypes.Load, payload: { labels: data } });
      } catch (error) {
        console.log(error);
      }
    };
    load();
  }, [dispatch]);

  return {
    labels: state.labels.labels,
    loadLabels,
  };
}

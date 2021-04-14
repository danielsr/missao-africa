import { AxiosResponse } from 'axios';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useHistory } from 'react-router';
import api from 'services/api';
import { useToaster } from 'store/toaster/hooks';
import { Label } from 'types';

export function useLabels() {
  const { data } = useQuery<AxiosResponse<Label[]>, Error>('labels', api.getLabels, {
    staleTime: 1000 * 60,
  });

  return { labels: data?.data };
}

export function useLabel() {
  const queryClient = useQueryClient();
  const history = useHistory();
  const { showToaster } = useToaster();

  const { mutate, isLoading } = useMutation(api.saveLabel, {
    onSuccess: () => {
      history.push('/labels');
      showToaster('Label saved!');
      queryClient.invalidateQueries('labels');
    },
    onError: (error: Error) => {
      history.push('/labels');
      showToaster(error.message);
    },
  });

  return { mutate, isLoading };
}

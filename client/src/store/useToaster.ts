import { useStore } from '.';
import { ToasterActionTypes, ToasterState } from './toaster';

export default function useToaster(): { toaster: ToasterState; showToaster: Function } {
  const [state, dispatch] = useStore();
  return {
    toaster: state.toaster,
    showToaster: (text) => {
      dispatch({ type: ToasterActionTypes.Show, payload: { text } });
      setTimeout(() => dispatch({ type: ToasterActionTypes.Hide }), 3000);
    },
  };
}

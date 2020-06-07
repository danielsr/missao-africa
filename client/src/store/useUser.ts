import { useStore } from '.';
import { UserActionTypes } from './user';

export default function useUser() {
  const { state, dispatch } = useStore();
  return {
    user: state.user,
    setUser: (user) => dispatch({ type: UserActionTypes.Set, user }),
  };
}

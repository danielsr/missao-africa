import { useStore } from 'store';
import { UserActionTypes } from '.';
import { User } from 'types';
import { setUser as setUserLocalStorage } from 'services/auth';

export function useUser(): { user?: User; setUser: Function } {
  const [state, dispatch] = useStore();
  return {
    user: state.user.user,
    setUser: (user) => {
      dispatch({ type: UserActionTypes.Set, payload: { user } });
      setUserLocalStorage(user);
    },
  };
}

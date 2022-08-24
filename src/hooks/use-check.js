import React from 'react';
import { useNavigate } from 'react-router-dom';
import useInit from './use-init';
import useSelector from './use-selector';
import useStore from './use-store';

export default function useCheck(type, direct) {
  const navigate = useNavigate();
  const store = useStore();
  const isLogged = useSelector((state) => state.session.isLogged);

  useInit(
    async () => {
      await store.get(type).loadUserData(localStorage.getItem('token'));
    },
    [],
    { backForward: true }
  );

  React.useEffect(() => {
    if (direct && !isLogged) {
      navigate(direct);
    }
  }, [isLogged]);
}

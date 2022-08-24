import React from 'react';
import useStore from '../../hooks/use-store';
import { useNavigate } from 'react-router-dom';
import useSelector from '../../hooks/use-selector';
import Login from '../login';

function LoginComp() {
  const store = useStore();
  const navigate = useNavigate();
  const select = useSelector((state) => ({
    user: state.auth.user,
    token: state.auth.token,
  }));
  const callbacks = {
    exit: React.useCallback(() => {
      store.get('auth').exit(select.token);
      navigate('../');
    }),
  };
  return (
    <Login
      name={select.user == undefined ? undefined : select.user.profile.name}
      exit={callbacks.exit}
    />
  );
}

export default LoginComp;

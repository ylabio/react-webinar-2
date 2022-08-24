import React, { useCallback } from 'react';
import LayoutFlex from '../../components/layout-flex';
import LoginPanel from '../../components/login-panel';
import { useNavigate } from 'react-router-dom';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';

function Authorization() {
  const store = useStore();

  const select = useSelector((state) => ({
    loggedIn: state.authorization.loggedIn,
    user: state.profile.user,
  }));

  const navigate = useNavigate();
  const callbacks = {
    moveToLogin: useCallback(() => navigate('/login'), []),
    moveToProfile: useCallback(() => navigate('/profile'), []),
    getLoggedOut: useCallback(
      (token) => store.get('authorization').logout(token),
      []
    ),
  };

  return (
    <LayoutFlex flex='end' padding='small'>
      <LoginPanel
        moveToProfile={callbacks.moveToProfile}
        moveToLogin={callbacks.moveToLogin}
        logout={callbacks.getLoggedOut}
        loggedIn={select.loggedIn}
        user={select.user}
      />
    </LayoutFlex>
  );
}

export default React.memo(Authorization);

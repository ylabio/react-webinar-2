import React, { useCallback, useLayoutEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import AuthPanel from '../../components/auth-panel';
import useSelector from '../../hooks/use-selector';
import useStore from '../../hooks/use-store';

function LayoutRoot() {
  const store = useStore();
  const navigate = useNavigate();
  const location = useLocation();
  const select = useSelector(state => ({
    isLogged: state.user.isLogged,
    user: state.user.data
  }));

  useLayoutEffect(() => {
    store.get('user').checkAuth();
  }, []);

  const callbacks = {
    // Переход на страницу логина
    onMoveToLogin: useCallback(() => navigate('/login', { state: { from: location } }), []),
    // Сброс авторизации
    onLogout: useCallback(() => store.get('user').logout(), []),
  };

  return (
    <>
      <AuthPanel
        flex="end"
        name={select.user.profile?.name}
        profileLink="/profile"
        isLogged={select.isLogged}
        onClick={select.isLogged ? callbacks.onLogout : callbacks.onMoveToLogin}
      />
      <Outlet />
    </>
  );
};

export default React.memo(LayoutRoot);

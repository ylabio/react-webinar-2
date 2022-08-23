import React, { useCallback } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import AuthPanel from '../../components/auth-panel';
import useInit from '../../hooks/use-init';
import useSelector from '../../hooks/use-selector';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';

function LayoutRoot() {
  const store = useStore();
  const navigate = useNavigate();
  const location = useLocation();
  const select = useSelector(state => ({
    isLogged: state.user.isLogged,
    user: state.user.data
  }));

  useInit(async () => {
    await store.get('user').checkAuth();
  }, []);

  const { t } = useTranslate();

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
        t={t} />
      <Outlet />
    </>
  );
};

export default React.memo(LayoutRoot);

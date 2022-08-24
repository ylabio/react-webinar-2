import React, { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import UserBarForm from '../../components/forms/user-bar-form';
import useInit from '../../hooks/use-init';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';
import useUser from '../../hooks/use-user';

function UserBar() {

  const { t } = useTranslate();
  const navigate = useNavigate();
  const location = useLocation();
  const store = useStore();
  const { fields, token } = useUser({ orRedirectTo: null });
  
  useInit(() => {
    if (token && !fields)
      store.get('user').loadUserData();
  }, [fields], { backForward: false });

  const callbacks = {
    // Открыть страницу авторизации
    onLogin: useCallback(() => { navigate('/login', { state: { from: location } }) }, []),

    // Забыть все данные о пользователе
    onLogout: useCallback(() => store.get('user').logout(), [])
  }

  return (
    <UserBarForm
      name={fields?.profile?.name ? fields.profile.name : fields?.username}
      link={'/profile'}
      onLogin={callbacks.onLogin}
      onLogout={callbacks.onLogout}
      t={t}
    />
  );
};

export default React.memo(UserBar);
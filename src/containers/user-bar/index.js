import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import UserBarForm from '../../components/forms/user-bar-form';
import useInit from '../../hooks/use-init';
import useSelector from '../../hooks/use-selector';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';

function UserBar() {

  const { t } = useTranslate();
  const navigate = useNavigate();
  const store = useStore();

  const select = useSelector(state => ({
    fields: state.user.fields,
    token: state.user.token
  }));

  useInit(() => {
    if (select.token && !select.fields)
      store.get('user').loadProfile();
  }, [select.fields], {backForward: false});

  const callbacks = {
    // Открыть страницу авторизации
    onLogin: useCallback(() => { navigate('/login') }, []),

    // Забыть все данные о пользователе
    onLogout: useCallback(() => store.get('user').logout(), [])
  }

  const name = select.fields?.profile?.name ? select.fields.profile.name : select.fields?.username;

  return (
    <UserBarForm
      name={name}
      link={'/profile'}
      onLogin={callbacks.onLogin}
      onLogout={callbacks.onLogout}
      t={t}
    />
  );
};

export default React.memo(UserBar);
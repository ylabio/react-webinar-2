import React, { useState, useCallback, useMemo } from 'react';
import useStore from '../../hooks/use-store';
import Layout from '../../components/layout';
import LayoutFlex from '../../components/layout-flex';
import LocaleSelect from '../../containers/locale-select';
import Login from '../../components/login';
import Tools from '../../containers/tools';
import User from '../../containers/user';
import { useNavigate } from 'react-router-dom';
import useTranslate from '../../hooks/use-translate';



function LoginLayout() {
  const navigate = useNavigate();
  const store = useStore();

  const [login, setLogin] = useState({ login: '', password: '' });
  const [error, setError] = useState(null);


  const { t } = useTranslate();

  const from = useMemo(() => location.state?.from || '/', []);

  const callbacks = {
    onFormChange: useCallback(
      e => {
        setLogin({ ...login, [e.target.name]: e.target.value });
        setError(null);
      },
      [login]
    ),

    onSubmit: useCallback(
      e => {
        e.preventDefault();
        if (login.login === '' || login.password === '') {
          return setError('Заполните все поля');
        }
        store
          .get('user')
          .login(login)
          .then(() => navigate(-1))
          .catch(err => setError(err.message));
      },
      [login]
    ),
  };

  return (
    <Layout
      auth={<User />}
      head={
        <LayoutFlex flex='between'>
          <h1>{t('title')}</h1>
          <LocaleSelect />
        </LayoutFlex>
      }
    >
      <Tools />
      <Login
        username={login.login}
        password={login.password}
        onFormChange={callbacks.onFormChange}
        onSubmit={callbacks.onSubmit}
        t={t}
        error={error}
      />
    </Layout>
  );
}

export default React.memo(LoginLayout);

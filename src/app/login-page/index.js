import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import Login from '../../components/login';
import Spinner from '../../components/spinner';
import Tools from '../../containers/tools';
import Layout from '../../components/layout';
import LayoutFlex from '../../components/layout-flex';
import LocaleSelect from '../../containers/locale-select';

function LoginPage() {
  const store = useStore();

  let navigate = useNavigate();

  const userStore = store.get('user');

  const { t } = useTranslate();

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const select = useSelector((state) => ({
    article: state.article.data,
    waiting: state.article.waiting,
  }));

  function handleSubmit(login, password) {
    if (!login || !password) {
      return;
    }
    userStore
      .authorize(login, password)
      .then((data) => {
        if (data.error) {
          setError(data.error.message);
          return;
        }
        if (data.result.token) {
          navigate('/');
          return data;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleChange(e) {
    setLogin(e.target.value);
  }

  function handlePassChange(e) {
    setPassword(e.target.value);
  }

  const callbacks = {
    handleLoginChange: useCallback((e) => setLogin(e.target.value), []),
    handlePasswordChange: useCallback((e) => setPassword(e.target.value), []),
    handleSubmit: useCallback((login, password) => {
      handleSubmit(login, password);
    }, []),
  };

  return (
    <Layout
      head={
        <LayoutFlex flex="between">
          <h1>{t('title')}</h1>
          <LocaleSelect />
        </LayoutFlex>
      }
    >
      <Tools />
      <Spinner active={select.waiting}>
        <Login
          onSubmit={callbacks.handleSubmit}
          login={login}
          password={password}
          error={error}
          handleLoginChange={/* callbacks.handleLoginChange */ handleChange}
          handlePasswordChange={/* callbacks.handlePasswordChange */ handlePassChange}
        />
      </Spinner>
    </Layout>
  );
}

export default React.memo(LoginPage);

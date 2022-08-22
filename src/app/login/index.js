import React from 'react';
import Layout from '../../components/layout';
import LayoutFlex from '../../components/layout-flex';
import LoginForm from '../../components/login-form';
import LocaleSelect from '../../containers/locale-select';
import Tools from '../../containers/tools';
import useTranslate from '../../hooks/use-translate';
import { useCallback } from 'react';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import Authorization from '../../containers/authorization';
import Spinner from '../../components/spinner';
import { useNavigate } from 'react-router-dom';

function Login() {
  const store = useStore();
  const navigate = useNavigate();

  const select = useSelector((state) => ({
    user: state.authorization.user,
    error: state.authorization.error,
    token: state.authorization.token,
    waiting: state.authorization.waiting,
  }));

  const { t } = useTranslate();

  const callbacks = {
    login: useCallback(async (login, password) => {
      store.get('authorization').login(login, password);
    }, []),
  };

  return (
    <Layout
      login={<Authorization />}
      head={
        <LayoutFlex flex='between'>
          <h1>{t('title')}</h1>
          <LocaleSelect />
        </LayoutFlex>
      }>
      <Tools />
      <Spinner active={select.waiting}>
        <LoginForm login={callbacks.login} error={select.error} />
      </Spinner>
    </Layout>
  );
}

export default React.memo(Login);

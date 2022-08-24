import React, { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import LoginForm from '../../components/forms/login-form';
import Layout from '../../components/layouts/layout';
import LayoutFlex from '../../components/layouts/layout-flex';
import Spinner from "../../components/spinner";
import LocaleSelect from '../../containers/locale-select';
import Tools from '../../containers/tools';
import UserBar from '../../containers/user-bar';
import useInit from '../../hooks/use-init';
import useSelector from '../../hooks/use-selector';
import useStore from "../../hooks/use-store";
import useTranslate from '../../hooks/use-translate';

function Login() {

  const navigate = useNavigate();
  const { state } = useLocation();
  const { t } = useTranslate();
  const store = useStore();

  const select = useSelector(state => ({
    fields: state.user.fields,
    inputs: state.login.inputs,
    waiting: state.login.waiting,
    error: state.login.error
  }));

  useInit(() => {
    if (select.error)
      store.get('login').resetError(); // сброс ошибки при открытии формы
    if (select.fields)
      state ? navigate(-1) : navigate('/'); // идем туда, откуда пришли. или на главную
  }, [select.fields, select.success], { backForward: true });

  const callbacks = {
    onLoginChange: useCallback(login => store.get('login').setLogin(login), []),
    onPasswordChange: useCallback(password => store.get('login').setPassword(password), []),
    onEnter: useCallback(() => store.get('login').login(), [])
  }

  return (
    <Layout
      head={
        <LayoutFlex flex="between">
          <h1>{t('title')}</h1>
          <LocaleSelect />
        </LayoutFlex>
      }
      top={
        <UserBar />
      }>
      <Tools />
      <Spinner active={select.waiting}>
        <LoginForm
          onLoginChange={callbacks.onLoginChange}
          onPasswordChange={callbacks.onPasswordChange}
          onEnter={callbacks.onEnter}
          error={select.error}
          t={t}
        />
      </Spinner>
    </Layout>
  )
};

export default React.memo(Login);
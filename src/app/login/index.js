import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const { t } = useTranslate();
  const store = useStore();

  const select = useSelector(state => ({
    fields: state.user.fields,
    inputs: state.user.inputs,
    waiting: state.user.waiting,
    error: state.user.error
  }));

  useInit(() => {
    if (select.fields)
      navigate('/profile')
  }, [select.fields], { backForward: true });

  const callbacks = {
    onLoginChange: useCallback(login => store.get('user').setLogin(login), []),
    onPasswordChange: useCallback(password => store.get('user').setPassword(password), []),
    onEnter: useCallback(() => store.get('user').login(), [])
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
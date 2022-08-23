import React, {useCallback} from 'react';
import useStore from '../../hooks/use-store';
import useInit from '../../hooks/use-init';
import useTranslate from '../../hooks/use-translate';
import Tools from '../../containers/tools';
import LayoutFlex from '../../components/layout-flex';
import Layout from '../../components/layout';
import LocaleSelect from '../../containers/locale-select';
import LoginTools from '../../containers/login-tools';
import LoginForm from '../../components/login-form';
import useSelector from '../../hooks/use-selector';
import {useNavigate} from 'react-router-dom';
import {handleErrorFromApi} from '../../utils/handleErrorFromApi';

function Login() {
  const store = useStore();
  const navigate = useNavigate();

  const select = useSelector(state => ({
    error: handleErrorFromApi(state.login.error),
    isAuthorized: state.login.isAuthorized
  }));

  useInit(() => {
    if (select.isAuthorized) {
      navigate('/profile');
    }
  }, [select.isAuthorized]);

  const callbacks = {
    signIn: useCallback(
      (login, password) => store.get('login').signIn(login, password),
      []
    ),
    signOut: useCallback(() => store.get('login').signOut(), [])
  };

  const {t} = useTranslate();

  return (
    <Layout
      head={
        <>
          <LoginTools />
          <LayoutFlex flex="between">
            <h1>{t('title')}</h1>
            <LocaleSelect />
          </LayoutFlex>
        </>
      }
    >
      <Tools />
      <LoginForm onSubmit={callbacks.signIn} error={select.error} />
    </Layout>
  );
}

export default React.memo(Login);

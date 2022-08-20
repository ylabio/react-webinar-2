import React, {useCallback} from 'react'
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';
import Layout from '../../components/layout';
import LayoutFlex from '../../components/layout-flex';
import LocaleSelect from '../../containers/locale-select';
import AuthForm from '../../components/auth-form';
import Tools from '../../containers/tools';
import AuthUser from '../../containers/auth-user';

function Login() {
  const store = useStore();
  const {t} = useTranslate()

  const callbacks = {
    login: useCallback((loginData) => store.get('auth').login(loginData), []),
  };

  return (
    <Layout auth={<AuthUser/>} head={
        <LayoutFlex flex="between">
          <h1>{t('title')}</h1>
          <LocaleSelect/>
        </LayoutFlex>
      }
    >
      <Tools/>
      <AuthForm login={callbacks.login} t={t}/>
    </Layout>
  )
}

export default Login
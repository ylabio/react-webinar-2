import React, {useCallback} from 'react'
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';
import Layout from '../../components/layout';
import LayoutFlex from '../../components/layout-flex';
import LocaleSelect from '../../containers/locale-select';
import Login from '../../components/login';
import Tools from '../../containers/tools';
import User from '../../containers/user';

function LoginLayout() {
  const store = useStore();
  const {t} = useTranslate()

  const callbacks = {
    login: useCallback((data) => store.get('auth').login(data), []),
  };

  return (
    <Layout auth={<User/>} head={
        <LayoutFlex flex="between">
          <h1>{t('title')}</h1>
          <LocaleSelect/>
        </LayoutFlex>
      }
    >
      <Tools/>
      <Login login={callbacks.login} t={t}/>
    </Layout>
  )
}

export default React.memo(LoginLayout)
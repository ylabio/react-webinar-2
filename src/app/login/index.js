import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../../components/login-form';
import useInit from '../../hooks/use-init';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import Layout from '../../components/layout';
import LayoutFlex from '../../components/layout-flex';
import LoginPanel from '../../components/login-panel';
import LocaleSelect from '../../containers/locale-select';
import Tools from '../../containers/tools';

function Login () {
  const { t } = useTranslate();
  const select = useSelector(state => ({
    user: state.auth.user
  }));
  const nav = useNavigate();

  useInit(() => {
    if (select.user) {
      nav('/profile', {replace: true})
    }
  }, [select.user]);

  return (
    <Layout top={<LoginPanel />} 
            head={
              <LayoutFlex flex="between">
                 <h1>{t('title')}</h1>
                 <LocaleSelect/>
              </LayoutFlex>
              }>
      <Tools />
      <LoginForm />
    </Layout>
  )
}

export default React.memo(Login);

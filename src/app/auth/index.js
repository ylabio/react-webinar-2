import React, { useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../../hooks/use-store";
import useCheckToken from "../../hooks/use-check-token";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import Tools from "../../containers/tools";
import LayoutFlex from "../../components/layout-flex";
import Layout from "../../components/layout";
import LocaleSelect from "../../containers/locale-select";
import LoginForm from '../../components/login-form';

function Auth() {
  const store = useStore();
  const navigate = useNavigate();
  const { t } = useTranslate();

  const { auth } = useSelector(state => ({
    auth: state.auth,
  }));

  const callbacks = {
    onLogin: useCallback((data) => {
      store.get('auth').login(data);
    }),
  }

  // check token
  useCheckToken('token');
  useEffect(() => {
    if (auth.isAuth) {
      localStorage.setItem('token', JSON.stringify({ token: auth.token }));
      navigate('/profile');
    }
  }, [auth.isAuth]);


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
      <LoginForm login={callbacks.onLogin} error={auth.errorMsg} />
    </Layout>
  )
}

export default React.memo(Auth);

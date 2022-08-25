import React from 'react';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';
import Tools from '../../containers/tools';
import LayoutFlex from '../../components/layout-flex';
import Layout from '../../components/layout';
import LocaleSelect from '../../containers/locale-select';
import Loggin from '../../components/loggin';
import { useNavigate } from 'react-router-dom';
import useSelector from '../../hooks/use-selector';

function Auth() {
  const store = useStore();
  const navigate = useNavigate();

  const [auth, setAuth] = React.useState({
    login: '',
    password: '',
    error: false,
  });

  const { t } = useTranslate();

  const select = useSelector((state) => ({
    items: state.basket.items,
    errorMessage: state.auth.errorMessage,
  }));

  const callbacks = {
    login: React.useCallback((e) =>
      setAuth({
        ...auth,
        login: e.target.value,
      }),
    ),
    password: React.useCallback((e) =>
      setAuth({
        ...auth,
        password: e.target.value,
      }),
    ),
  };

  async function logging() {
    const result = await store.get('auth').authentication(auth.login, auth.password);
    if (result) {
      navigate(-1);
    } else {
      setAuth({
        ...auth,
        error: true,
      });
    }
  }

  return (
    <Layout
      head={
        <LayoutFlex flex='between'>
          <h1>{t('title')}</h1>
          <LocaleSelect />
        </LayoutFlex>
      }>
      <Tools />
      <Loggin
        auth={callbacks.authFunc}
        loginFunc={callbacks.login}
        passwordFunc={callbacks.password}
        login={auth.login}
        password={auth.password}
        error={auth.error}
        logging={logging}
        errorMessage={select.errorMessage}
      />
    </Layout>
  );
}

export default React.memo(Auth);

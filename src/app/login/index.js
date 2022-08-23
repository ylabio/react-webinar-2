import React, { useCallback, useEffect } from 'react';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import { useNavigate, useParams } from 'react-router-dom';
import useInit from '../../hooks/use-init';
import useTranslate from '../../hooks/use-translate';
import Tools from '../../containers/tools';
import Layout from '../../components/layout';
import LayoutFlex from '../../components/layout-flex';
import LocaleSelect from '../../containers/locale-select';
import AuthentificationHeader from '../../containers/authentification-header';
import LoginForm from '../../components/login-form';

function Login() {
  const store = useStore();

  // Параметры из пути /articles/:id
  const params = useParams();
  const navigate = useNavigate();

  useInit(async () => {
    await store.get('article').load(params.id);
  }, [params.id]);

  const select = useSelector((state) => ({
    user: state.user,
    error: state.error.error,
  }));

  const { t } = useTranslate();

  const callbacks = {
    onLogIn: useCallback(
      ({ login, password }) => store.get('user').logInUser({ login, password }),
      []
    ),

    onLogOut: useCallback(() => store.get('user').logOutUser(), []),
    translate: useCallback((text) => t(text)),
    navigate: useCallback((link) => navigate(link)),
    deleteError: useCallback(() => store.get('error').deleteError()),
  };

  useEffect(() => {
    if (select.user.name) {
      callbacks.navigate('/');
    }
  }, [select.user]);

  useEffect(() => {
    setTimeout(() => {
      callbacks.deleteError();
    }, 5000);
  }, [select.error]);

  return (
    <Layout
      head={
        <LayoutFlex flex='between'>
          <h1>{t('title')}</h1>
          <LocaleSelect />
        </LayoutFlex>
      }
      auth={<AuthentificationHeader />}>
      <Tools />
      <LoginForm
        translate={callbacks.translate}
        onSubmit={callbacks.onLogIn}
        error={select.error}
      />
    </Layout>
  );
}

export default React.memo(Login);

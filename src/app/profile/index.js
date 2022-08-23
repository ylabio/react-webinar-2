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
import UserProfile from '../../components/user-profile';

function Profile() {
  const store = useStore();

  // Параметры из пути /articles/:id
  const params = useParams();
  const navigate = useNavigate();

  useInit(async () => {
    await store.get('article').load(params.id);
  }, [params.id]);

  const select = useSelector((state) => ({
    user: state.user,
  }));

  const { t } = useTranslate();

  const callbacks = {
    translate: useCallback((text) => t(text)),
    navigate: useCallback((link) => navigate(link)),
  };

  useEffect(() => {
    if (!select.user.name) {
      callbacks.navigate('/');
    }
  }, [select.user]);

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
      <UserProfile user={select.user} translate={callbacks.translate} />
    </Layout>
  );
}

export default React.memo(Profile);

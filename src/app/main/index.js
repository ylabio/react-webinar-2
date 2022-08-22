import React, { useCallback } from 'react';
import useStore from '../../hooks/use-store';
import useInit from '../../hooks/use-init';
import useTranslate from '../../hooks/use-translate';
import CatalogFilter from '../../containers/catalog-filter';
import CatalogList from '../../containers/catalog-list';
import Tools from '../../containers/tools';
import LayoutFlex from '../../components/layout-flex';
import Layout from '../../components/layout';
import LocaleSelect from '../../containers/locale-select';
import useAuth from '../../hooks/use-auth';
import LoginTools from '../../components/login-tools';

function Main() {
  const store = useStore();

  useInit(
    async () => {
      await store.get('user').checkAuth();
      await store.get('catalog').initParams();
    },
    [],
    { backForward: true }
  );

  const { t } = useTranslate();
  const { user, isAuth } = useAuth();

  const callbacks = {
    logout: useCallback(() => store.get('user').logout(), []),
  };

  return (
    <>
      <LoginTools userName={user.profile?.name} onLogout={callbacks.logout} />
      <Layout
        head={
          <LayoutFlex flex='between'>
            <h1>{t('title')}</h1>
            <LocaleSelect />
          </LayoutFlex>
        }
      >
        <Tools />
        <CatalogFilter />
        <CatalogList />
      </Layout>
    </>
  );
}

export default React.memo(Main);

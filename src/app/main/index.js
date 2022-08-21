import React, {useCallback} from "react";
import useStore from "../../hooks/use-store";
import useInit from "../../hooks/use-init";
import useTranslate from "../../hooks/use-translate";
import CatalogFilter from "../../containers/catalog-filter";
import CatalogList from "../../containers/catalog-list";
import Tools from "../../containers/tools";
import LayoutFlex from "../../components/layout-flex";
import Layout from "../../components/layout";
import LocaleSelect from "../../containers/locale-select";
import {useAuth} from "../../hooks/use-auth";
import LoginBar from "../../components/login-bar";

function Main() {
  const store = useStore();
  const {t} = useTranslate();
  const {user, isAuth} = useAuth();

  useInit(async () => {
    await store.get('user').restore();
    await store.get('catalog').initParams();
  }, [], {backForward: true});

  const callbacks = {
    logOut: useCallback(() => store.get('user').logOut(), []),
  };

  return (
    <>
      <LoginBar userName={isAuth && user.username} logOut={callbacks.logOut}/>
      <Layout head={
        <LayoutFlex flex="between">
          <h1>{t('title')}</h1>
          <LocaleSelect/>
        </LayoutFlex>
      }>
        <Tools/>
        <CatalogFilter/>
        <CatalogList/>
      </Layout>
    </>
  )
}

export default React.memo(Main);

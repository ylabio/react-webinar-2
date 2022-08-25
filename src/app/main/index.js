import React, { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useInit from "../../hooks/use-init";
import useTranslate from "../../hooks/use-translate";
import CatalogFilter from "../../containers/catalog-filter";
import CatalogList from "../../containers/catalog-list";
import Tools from "../../containers/tools";
import LayoutFlex from "../../components/layout-flex";
import Layout from "../../components/layout";
import LocaleSelect from "../../containers/locale-select";
import LoginMenu from "../../components/login-menu";

function Main() {
  useInit(async () => {
    await store.get('catalog').initParams();
    await store.get('categories').getCategories();
    await store.get('auth').getInitAuth();
  }, [], {backForward: true});

  const store = useStore();
  const user = useSelector(state => state.auth.user);
  const {t} = useTranslate();
  const navigate = useNavigate();

  const options = {
    loginMenu: useMemo(() => ({ loginTitle: t('tologin'), logOutTitle: t('logout') }), [t]),
  }

  const callbacks = {
    toLogin: useCallback(() => navigate('/login'), []),
    logOut: useCallback(() => store.get('auth').logOut(), []),
  }

  return (
    <>
      <Layout head={
        <>
          <LoginMenu options={options.loginMenu} user={user} toLogin={callbacks.toLogin} logOut={callbacks.logOut}/>
          <LayoutFlex flex="between">
            <h1>{t('title')}</h1>
            <LocaleSelect/>
        </LayoutFlex>
        </>}>
        <Tools/>
        <CatalogFilter/>
        <CatalogList/>
      </Layout>
    </>

  )
}

export default React.memo(Main);

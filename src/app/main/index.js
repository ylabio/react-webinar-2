import React, { useCallback, useMemo, useContext } from "react";
import useStore from "../../hooks/use-store";
import { useNavigate } from 'react-router-dom';
import useInit from "../../hooks/use-init";
import useTranslate from "../../hooks/use-translate";
import CatalogFilter from "../../containers/catalog-filter";
import CatalogList from "../../containers/catalog-list";
import Tools from "../../containers/tools";
import LayoutFlex from "../../components/layout-flex";
import Layout from "../../components/layout";
import LocaleSelect from "../../containers/locale-select";
import LoginMenu from "../../components/login-menu";
import { AuthContext } from "../../store/authcontext";

function Main() {
  const store = useStore();

  useInit(async () => {
    await store.get('catalog').initParams();
    await store.get('categories').getCategories();
  }, [], {backForward: true});

  const {t} = useTranslate();
  const navigate = useNavigate();
  const { user, toLogin, logOut } = useContext(AuthContext);
  const callbacks = {
    toLogin: useCallback(() => navigate('/login'), [toLogin]),

  };

  const options = {
    loginMenu: useMemo(() => ({ loginTitle: t('tologin'), logOutTitle: t('logout'), toLogin: callbacks.toLogin }), [t]),
  }
  
  return (
    <>
      <Layout head={
        <>
          <LoginMenu options={options.loginMenu}/>
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

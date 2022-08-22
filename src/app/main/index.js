import React, {useCallback, useEffect} from "react";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useInit from "../../hooks/use-init";
import useTranslate from "../../hooks/use-translate";
import CatalogFilter from "../../containers/catalog-filter";
import CatalogList from "../../containers/catalog-list";
import Tools from "../../containers/tools";
import LayoutFlex from "../../components/layout-flex";
import Layout from "../../components/layout";
import LoginControl from "../../components/login-control";
import LocaleSelect from "../../containers/locale-select";

function Main() {
  const store = useStore();

  useInit(async () => {
    await store.get('catalog').initParams();
    await store.get('catalog').loadCategories();
    await store.get('autorization').getProfile();
  }, [], {backForward: true});

  const select = useSelector(state => ({
    user: state.autorization.user
  }));
  

  const callbacks = {
    onLogOut: useCallback(() => store.get('autorization').logOut(), []),
  };

  const {t} = useTranslate();

  return (
    <>

      <LoginControl
       t={t}
       userName={select.user.profile ? select.user.profile.name : null}
       onLogOut={callbacks.onLogOut}/>
      
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

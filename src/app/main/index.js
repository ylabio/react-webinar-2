import React, { useCallback } from "react";
import useStore from "../../hooks/use-store";
import useInit from "../../hooks/use-init";
import useTranslate from "../../hooks/use-translate";
import CatalogFilter from "../../containers/catalog-filter";
import CatalogList from "../../containers/catalog-list";
import Tools from "../../containers/tools";
import LayoutFlex from "../../components/layout-flex";
import Layout from "../../components/layout";
import LocaleSelect from "../../containers/locale-select";
import { useNavigate } from "react-router-dom";

function Main() {
  const store = useStore();
  const navigate = useNavigate();

  useInit(async () => {
    await store.get('catalog').initParams();
  }, [], {backForward: true});

  const {t} = useTranslate();

  const callbacks = {
    openLoginPage: useCallback(() => navigate('/login'), []),
  };

  return (
    <Layout 
      head={
      <LayoutFlex flex="between">
        <h1>{t('title')}</h1>
        <LocaleSelect/>
      </LayoutFlex>}
      
      openLoginPage={callbacks.openLoginPage}
    > 
      <Tools/>
      <CatalogFilter/>
      <CatalogList/>
    </Layout>
  );
}

export default React.memo(Main);

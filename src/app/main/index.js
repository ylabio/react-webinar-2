import React from "react";
import useStore from "../../hooks/use-store";
import useInit from "../../hooks/use-init";
import useTranslate from "../../hooks/use-translate";
import CatalogFilter from "../../containers/catalog-filter";
import CatalogList from "../../containers/catalog-list";
import Tools from "../../containers/tools";
import LayoutFlex from "../../components/layout-flex";
import Layout from "../../components/layout";
import LoginMenu from "../../containers/login-menu";
import LocaleSelect from "../../containers/locale-select";

function Main() {
  const store = useStore();
  const {t} = useTranslate();

  useInit(async () => {
    await store.get('catalog').initParams();
  }, [], {backForward: true});

  useInit(async () => {
    await store.get('categories').load();
  }, [], {backForward: true});

  return (
    <Layout head={
      <LayoutFlex flex="between">
        <h1>{t('title')}</h1>
        <LocaleSelect/>
      </LayoutFlex>
    }>
      <LoginMenu/>
      <Tools/>
      <CatalogFilter/>
      <CatalogList/>
    </Layout>
  )
}

export default React.memo(Main);

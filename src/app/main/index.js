import React from "react";
import Layout from "../../components/layouts/layout";
import LayoutFlex from "../../components/layouts/layout-flex";
import CatalogFilter from "../../containers/catalog-filter";
import CatalogList from "../../containers/catalog-list";
import LocaleSelect from "../../containers/locale-select";
import Tools from "../../containers/tools";
import UserBar from "../../containers/user-bar";
import useInit from "../../hooks/use-init";
import useStore from "../../hooks/use-store";
import useTranslate from "../../hooks/use-translate";

function Main() {
  const store = useStore();

  useInit(async () => {
    await store.get('catalog').initParams();
    await store.get('categories').load();
  }, [], { backForward: true });

  const { t } = useTranslate();

  return (
    <Layout
      head={
        <LayoutFlex flex="between">
          <h1>{t('title')}</h1>
          <LocaleSelect />
        </LayoutFlex>
      }
      top={
        <UserBar/>
      }>
      <Tools />
      <CatalogFilter />
      <CatalogList />
    </Layout>
  )
}

export default React.memo(Main);

import React from "react";
import useStore from "../../hooks/use-store";
import useInit from "../../hooks/use-init";
import useTranslate from "../../hooks/use-translate";
import CatalogFilter from "../../containers/catalog-filter";
import CatalogList from "../../containers/catalog-list";
import Tools from "../../containers/tools";
import LayoutFlex from "../../components/layouts/layout-flex";
import Layout from "../../components/layouts/layout";
import User from "../../containers/user";

function Main() {
  const store = useStore();

  useInit(async () => {
    await store.get('catalog').initParams();
    await store.get('categories').initCategories();
  }, [], { backForward: true });

  const { t } = useTranslate();

  return (
    <Layout
      before={
        <LayoutFlex flex='end' padding={false}>
          <User />
        </LayoutFlex>}
      head={
        <LayoutFlex flex="between">
          <h1>{t('title')}</h1>
        </LayoutFlex>
      }>
      <Tools />
      <CatalogFilter />
      <CatalogList />
    </Layout>
  )
}

export default React.memo(Main);
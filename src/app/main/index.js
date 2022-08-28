import React from "react";
import useStore from "../../hooks/use-store";
import useInit from "../../hooks/use-init";
import CatalogFilter from "../../containers/catalog/catalog-filter";
import CatalogList from "../../containers/catalog/catalog-list";
import Layout from "../../components/layouts/layout";
import TopContainer from "../../containers/top";
import HeadContainer from "../../containers/head";
import ToolsContainer from "../../containers/tools";

function Main() {
  const store = useStore();

  useInit(async () => {
    await Promise.all([
      store.get('catalog').initParams(),
      store.get('categories').load()
    ]);
  }, [], {backForward: true});

  return (
    <Layout>
      <TopContainer/>
      <HeadContainer/>
      <ToolsContainer/>
      <CatalogFilter/>
      <CatalogList/>
    </Layout>
  )
}

export default React.memo(Main);

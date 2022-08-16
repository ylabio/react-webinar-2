import Layout from "../../components/layout";
import React from "react";
import useStore from "../../utils/use-store";
import useInit from "../../utils/use-init";
import CatalogFilter from "../../containers/catalog-filter";
import CatalogList from "../../containers/catalog-list";
import Tools from "../../containers/tools";

function Main() {
  const store = useStore();

  useInit(async () => {
    await store.get('catalog').initParams();
  }, [], {backForward: true});

  return (
    <Layout head={<h1>Магазин</h1>}>
      <Tools/>
      <CatalogFilter/>
      <CatalogList/>
    </Layout>
  )
}

export default React.memo(Main);

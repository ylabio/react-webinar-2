import React from "react";
import useStore from "../../hooks/use-store";
import useInit from "../../hooks/use-init";
import CatalogFilter from "../../containers/catalog-filter";
import CatalogList from "../../containers/catalog-list";
import Tools from "../../containers/tools";
import Layout from "../../components/layout";
import Header from "../../containers/header";

function Main() {
  const store = useStore();

  useInit(async () => {
    await store.get('catalog').initParams();
  }, [], {backForward: true});

  return (
    <Layout 
			head={<Header />}
		>
      <Tools/>
      <CatalogFilter/>
      <CatalogList/>
    </Layout>
  )
}

export default React.memo(Main);

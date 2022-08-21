import React from "react";
import useStore from "../../hooks/use-store";
import useInit from "../../hooks/use-init";
import CatalogFilter from "../../containers/catalog-filter";
import CatalogList from "../../containers/catalog-list";
import CommonLayout from "../../containers/common-layout";

function Main() {
  const store = useStore();

  useInit(async () => {
    store.get('catalog').fetchCategories();
    await store.get('catalog').initParams();
  }, [], {backForward: true});

  return (
    <CommonLayout>
      <CatalogFilter/>
      <CatalogList/>
    </CommonLayout>
  )
}

export default React.memo(Main);

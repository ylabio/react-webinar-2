import React from "react";
import useStore from "../../hooks/use-store";
import useInit from "../../hooks/use-init";
import useTranslate from "../../hooks/use-translate";
import CatalogFilter from "../../containers/catalog-filter";
import CatalogList from "../../containers/catalog-list";
import PageTemplate from "../../components/page-template";

function Main() {
  const store = useStore();

  useInit(async () => {
    await store.get('catalog').initParams();
  }, [], {backForward: true});

  const {t} = useTranslate();

  return (
    <PageTemplate title={t('title')}>
      <CatalogFilter/>
      <CatalogList/>
    </PageTemplate>
  )
}

export default React.memo(Main);

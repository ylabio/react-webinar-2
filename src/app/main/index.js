import React from "react";
import useStore from "../../hooks/use-store";
import useInit from "../../hooks/use-init";
import useTranslate from "../../hooks/use-translate";
import CatalogFilter from "../../containers/catalog/catalog-filter";
import CatalogList from "../../containers/catalog/catalog-list";
import PageTemplate from "../../containers/page-template";
import {useLocation} from "react-router-dom";

function Main() {
  const store = useStore();
  const location = useLocation();

  useInit(async () => {
    await store.get('catalog').initParams();
  }, [location.search], {backForward: true});

  const {t} = useTranslate();

  return (
    <PageTemplate title={t('title')}>
      <CatalogFilter/>
      <CatalogList/>
    </PageTemplate>
  )
}

export default React.memo(Main);

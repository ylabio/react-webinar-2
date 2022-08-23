import React from "react";
import useStore from "../../hooks/use-store";
import useInit from "../../hooks/use-init";
import useTranslate from "../../hooks/use-translate";
import CatalogFilter from "../../containers/catalog-filter";
import CatalogList from "../../containers/catalog-list";
import Tools from "../../containers/tools";
import LayoutFlex from "../../components/layouts/layout-flex";
import Layout from "../../components/layouts/layout";
import LocaleSelect from "../../containers/locale-select";
import PanelLogin from "../../containers/panel-login";
import {useLocation} from "react-router-dom";

function Main() {
  const store = useStore();
  const location = useLocation();

  useInit(async () => {
    await store.get('catalog').initParams();
  }, [location.search], {backForward: true});

  const {t} = useTranslate();

  return (
    <Layout
      panelLogin={
        <PanelLogin />
      }
      head={
        <LayoutFlex flex="between">
          <h1>{t('title')}</h1>
          <LocaleSelect/>
        </LayoutFlex>}
    >
      <Tools/>
      <CatalogFilter/>
      <CatalogList/>
    </Layout>
  )
}

export default React.memo(Main);

import React from "react";
import useStore from "../../hooks/use-store";
import useInit from "../../hooks/use-init";
import useTranslate from "../../hooks/use-translate";
import CatalogFilter from "../../containers/catalog-filter";
import CatalogList from "../../containers/catalog-list";
import Tools from "../../containers/tools";
import LayoutFlex from "../../components/layout-flex";
import Layout from "../../components/layout";
import LocaleSelect from "../../containers/locale-select";
import Auth from "../../containers/auth";
import Spinner from "../../components/spinner";
import useSelector from "../../hooks/use-selector";

function Main() {
  const store = useStore();
  const select = useSelector(state => ({
    waiting: state.catalog.waiting,
  }));

  useInit(async () => {
    await store.get('category').getCategory();
    await store.get('catalog').initParams();
  }, [], {backForward: true});

  const {t} = useTranslate();

  return (
    <Layout auth={<Auth />}
    head={
      <LayoutFlex flex="between">
        <h1>{t('title')}</h1>
        <LocaleSelect/>
      </LayoutFlex>
    }>
      <Tools/>
      <Spinner active={select.waiting}>
        <CatalogFilter/>
        <CatalogList/>
      </Spinner>
    </Layout>
  )
}

export default React.memo(Main);

import React, {useEffect} from "react";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useInit from "../../hooks/use-init";
import CatalogFilter from "../../containers/catalog-filter";
import CatalogList from "../../containers/catalog-list";
import useTranslate from "../../hooks/use-translate";
import Tools from "../../containers/tools";
import Layout from "../../components/layout";
import Header from "../../containers/header";

function Main() {  
  const store = useStore();
  
  const select = useSelector(state => ({
    waiting: state.catalog.waiting
  }));
  
  useInit(async () => {
    await store.get('catalog').initParams();
  }, [], {backForward: true});
  
  // Сохраняем текущий path для редиректа
  useEffect(() => {
    store.get('auth').setRedirect(window.location.pathname + window.location.search);
  }, [select.waiting]);

  const {t} = useTranslate();

  return (
    <Layout head={<Header title={t('title')}/>}>
      <Tools/>
      <CatalogFilter/>
      <CatalogList/>
    </Layout>
  )
}

export default React.memo(Main);

import React, {useEffect} from "react";
import useStore from "../../hooks/use-store";
import useInit from "../../hooks/use-init";
import useTranslate from "../../hooks/use-translate";
import CatalogFilter from "../../containers/catalog-filter";
import CatalogList from "../../containers/catalog-list";
import Tools from "../../containers/tools";
import LayoutFlex from "../../components/layout-flex";
import Layout from "../../components/layout";
import LocaleSelect from "../../containers/locale-select";
import MenuRegister from "../../components/menu-register";


function Main() {
  const store = useStore();

  useInit(async () => {
    await store.get('catalog').initParams();
    await store.get('category').loadCategory();
  }, [], {backForward: true});

  const {t} = useTranslate();

  return (
    
    <Layout head={
        <LayoutFlex flex="between">
          <h1>{t('title')}</h1>
          <LocaleSelect/>
        </LayoutFlex>}
        topHead={
        <MenuRegister link={'/login'}/>
        }>
      <Tools/>
      <CatalogFilter/>
      <CatalogList/>
    </Layout>
  )
}

export default React.memo(Main);

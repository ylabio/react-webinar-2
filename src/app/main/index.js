import React, { useEffect, useCallback } from "react";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import useInit from "../../hooks/use-init";
import useTranslate from "../../hooks/use-translate";
import CatalogFilter from "../../containers/catalog-filter";
import CatalogList from "../../containers/catalog-list";
import Tools from "../../containers/tools";
import LayoutFlex from "../../components/layout-flex";
import LayoutGrid from "../../components/layout-grid";
import Layout from "../../components/layout";
import LocaleSelect from "../../containers/locale-select";
import HeaderSign from '../../components/header_sign'

function Main() {
  const store = useStore();

  const token = localStorage.getItem('token')
 
  const select = useSelector(state => ({
    result: state.form.result
  }));

  useEffect(() => {
    if(token) {
      callbacks.getToken(token)
    }
  }, [])

  const callbacks = {
    getToken: useCallback((token) => store.get('form').loadProfile(token), []),
    fetchLogout:  useCallback(() => store.get('form').logout(), []),
  }

  useInit(async () => {
    await store.get('catalog').initParams();
  }, [], {backForward: true});

  

  const {t} = useTranslate();

  return (
    <Layout head={
      <LayoutGrid flex="between">
        <HeaderSign 
          logout={callbacks.fetchLogout} 
          result={select.result.result} 
          profile={token ? token : null}
        />
        <h1>{t('title')}</h1>
        <LocaleSelect/>
      </LayoutGrid>
      
    }>
      <Tools/>
      <CatalogFilter/>
      <CatalogList/>
    </Layout>
  )
}

export default React.memo(Main);

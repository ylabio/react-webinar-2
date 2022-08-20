import React, { useCallback, useEffect } from "react";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useInit from "../../hooks/use-init";
import useTranslate from "../../hooks/use-translate";
import CatalogFilter from "../../containers/catalog-filter";
import CatalogList from "../../containers/catalog-list";
import Tools from "../../containers/tools";
import LayoutFlex from "../../components/layout-flex";
import Layout from "../../components/layout";
import LocaleSelect from "../../containers/locale-select";
import {removeToken, getToken} from "../../services/token";
import api from "../../services/api";

function Main() {
  const store = useStore();
  
  const select = useSelector(state => ({
    name: state.user.name,
  }));
  
  useInit(async () => {
    await store.get('catalog').initParams();
  }, [], {backForward: true});
  
  const {t} = useTranslate();

  useEffect(() => {
    const load = async () => {
      const res = await api.get('/users/self/');
      store.get('user').setName(res.data.result.profile.name)
    };

    if (getToken()) load();
  }, [])

  const callbacks = {
    removeToken: useCallback(() => {
      removeToken();
      store.get('user').removeName()
    }, []),
  };

  return (
    <Layout t={t} name={select.name} removeToken={callbacks.removeToken} head={
      <LayoutFlex flex="between">
        <h1>{t('title')}</h1>
        <LocaleSelect/>
      </LayoutFlex>
    }>
      <Tools/>
      <CatalogFilter/>
      <CatalogList/>
    </Layout>
  )
}

export default React.memo(Main);

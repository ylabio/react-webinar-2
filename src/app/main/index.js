import React, {useEffect} from "react";

import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useInit from "../../hooks/use-init";
import useTranslate from "../../hooks/use-translate";

import CatalogFilter from "../../containers/catalog-filter";
import CatalogList from "../../containers/catalog-list";
import LocaleSelect from "../../containers/locale-select";
import Tools from "../../containers/tools";
import LoginLogout from '../../containers/login-logout';

import LayoutFlex from "../../components/layouts/layout-flex";
import Layout from "../../components/layouts/layout";

import isLocalStorageAvailable from '../../utils/test-localstorage';

function Main() {
  const store = useStore();

  useInit(async () => {
    await store.get('catalog').initParams();
  }, [], {backForward: true});

  const {t} = useTranslate();

  const select = useSelector(state => ({
    items: state.basket.items,
    token: state.authorization.token
  }));


  useEffect(() => {
    //получаем данные из localStorage, если они есть
    if ( isLocalStorageAvailable() && 
         localStorage.getItem("basket") && 
         select.items.length === 0)
      store.get('basket').setFromStorage(localStorage.getItem("basket"));
    //получаем информацию о пользователе  
    if (select.token)
      store.get('userinfo').setUserInfo(select.token);
  }, [])

  return (
    <Layout head={
      <LayoutFlex flex="between">
        <h1>{t('title')}</h1>
        <LocaleSelect/>
      </LayoutFlex>
    } loginlogout={<LoginLogout/>}>
      <Tools/>
      <CatalogFilter/>
      <CatalogList/>
    </Layout>
  )
}

export default React.memo(Main);

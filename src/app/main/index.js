import React, {useEffect} from "react";
import useStore from "../../hooks/use-store";
import useInit from "../../hooks/use-init";
import useTranslate from "../../hooks/use-translate";
import CatalogFilter from "../../containers/catalog-filter";
import CatalogList from "../../containers/catalog-list";
import Tools from "../../containers/tools";
import LayoutFlex from "../../components/layouts/layout-flex";
import Layout from "../../components/layouts/layout";
import LocaleSelect from "../../containers/locale-select";
import useSelector from "../../hooks/use-selector";

function Main() {
  const store = useStore();

  useInit(async () => {
    await store.get('catalog').initParams();
  }, [], {backForward: true});

  const {t} = useTranslate();

  const select = useSelector(state => ({
    article: state.article.data,
    dataUser: state.authorization.dataUser
  }));

  //управление отображением в Authorization
  let user = '';
  if (select.dataUser?.profile?.name)
   user = select.dataUser.profile.name;
   
  //проверка авторизации
  let tokenCookie = document.cookie.match(/token=(.+?)(;|$)/);
  if(!user && tokenCookie)
    store.get('authorization').reLogin(tokenCookie[1]);

  //получаем данные из localStorage, если они есть  
  useEffect(() => {
    if ( localStorage.getItem("basket"))
      store.get('basket').setFromStorage(localStorage.getItem("basket"))
  }, [])  

  return (
    <Layout head={
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

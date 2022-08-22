import React, {useEffect} from "react";
import useTranslate from "../../hooks/use-translate";
import Cabinet from "../../containers/cabinet";
import LayoutFlex from "../../components/layouts/layout-flex";
import Layout from "../../components/layouts/layout";
import LocaleSelect from "../../containers/locale-select";
import useSelector from "../../hooks/use-selector";
import useStore from "../../hooks/use-store";
import isLocalStorageAvailable from '../../utils/test-localstorage';

function Profile() {

  const store = useStore();

  const {t} = useTranslate();

  const select = useSelector(state => ({
    article: state.article.data,
    dataUser: state.authorization.dataUser
  }));

  //проверка авторизации
  let user = '';
  if (select.dataUser?.profile?.name)
   user = select.dataUser.profile.name;
   let tokenCookie = '';
  if (navigator.cookieEnabled)
    tokenCookie = document.cookie.match(/token=(.+?)(;|$)/);
  if(!user && tokenCookie)
    store.get('authorization').reLogin(tokenCookie[1]);

  //получаем данные из localStorage, если они есть  
  useEffect(() => {
    if ( isLocalStorageAvailable() && localStorage.getItem("basket"))
      store.get('basket').setFromStorage(localStorage.getItem("basket"))
  }, [])

  return (
    <Layout head={
      <LayoutFlex flex="between">
        <h1>{t('title')}</h1>
        <LocaleSelect/>
      </LayoutFlex>
    }> 
      <Cabinet/>
    </Layout>
  )
}

export default React.memo(Profile);

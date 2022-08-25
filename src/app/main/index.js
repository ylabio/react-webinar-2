import React, { useCallback } from "react";
import useStore from "../../hooks/use-store";
import useInit from "../../hooks/use-init";
import useTranslate from "../../hooks/use-translate";
import CatalogFilter from "../../containers/catalog-filter";
import CatalogList from "../../containers/catalog-list";
import Tools from "../../containers/tools";
import LayoutFlex from "../../components/layout-flex";
import Layout from "../../components/layout";
import LocaleSelect from "../../containers/locale-select";
import LoginButton from "../../components/button-login";
import useSelector from './../../hooks/use-selector';
import { useLocation } from 'react-router-dom';

function Main() {
  const store = useStore();
  const callbacks = {
    deleteUser: useCallback((token) => store.get('user').deleteUser(token), []),  
    checkUser:useCallback((token)=>store.get('user').checkUser(token),[])
  }
  const select = useSelector(state => ({
    token: state.user.user.token,
    user: state.user.user,
  }));

  useInit(async () => {
    await store.get('catalog').initParams();
    await  callbacks.checkUser(localStorage.getItem('token'))
  }, [], { backForward: true });



  const { t } = useTranslate();
  return (
    <Layout top={
      <LoginButton
        
        name={select.user.userName}
        path={`/profile/${select.user._id}`}
        deleteUser={callbacks.deleteUser}
        token={select.token}
      />}
      head={
        <LayoutFlex flex="between">
          <h1>{t('title')}</h1>
          <LocaleSelect />
        </LayoutFlex>
      }>
      <Tools />
      <CatalogFilter />
      <CatalogList />
    </Layout>
  )
}

export default React.memo(Main);

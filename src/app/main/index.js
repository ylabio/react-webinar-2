import React, { useCallback } from "react";
import useStore from "../../hooks/use-store";
import useInit from "../../hooks/use-init";
import useTranslate from "../../hooks/use-translate";
import CatalogFilter from "../../containers/catalog-filter";
import CatalogList from "../../containers/catalog-list";
import Tools from "../../containers/tools";
import LocaleSelect from "../../containers/locale-select";
import { useNavigate } from "react-router-dom";
import useSelector from "../../hooks/use-selector";
import { getUserDataFromLS } from "../../utils";
import Layout from '../../components/layouts/layout';
import LayoutFlex from '../../components/layouts/layout-flex';

function Main() {
  const store = useStore();
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);

  useInit(async () => {
    await store.get('catalog').initParams();
  }, [], {backForward: true});

  const {t} = useTranslate();

  const callbacks = {
    openLoginPage: useCallback(() => navigate('/login'), []),
    signOut: useCallback(() => {
      const token = getUserDataFromLS().token;
      (async () => {
        await store.get('auth').signOut(token);
        navigate('/login');
      })()
    }, []),
  };

  return (
    <Layout 
      head={
      <LayoutFlex flex="between">
        <h1>{t('title')}</h1>
        <LocaleSelect/>
      </LayoutFlex>}
      
      handleAuth={callbacks.openLoginPage}
      signOut={callbacks.signOut}
      userData={user?.profile?.name}
      link='/profile'
    > 
      <Tools/>
      <CatalogFilter/>
      <CatalogList/>
    </Layout>
  );
}

export default React.memo(Main);

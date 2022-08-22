import React, {useCallback, useEffect} from "react";
import useStore from "../../hooks/use-store";
import useInit from "../../hooks/use-init";
import useTranslate from "../../hooks/use-translate";
import CatalogFilter from "../../containers/catalog-filter";
import CatalogList from "../../containers/catalog-list";
import Tools from "../../containers/tools";
import LayoutFlex from "../../components/layout-flex";
import Layout from "../../components/layout";
import LocaleSelect from "../../containers/locale-select";
import useSelector from "../../hooks/use-selector";
import LoginHead from "../../components/login-head";

function Main() {
  const store = useStore();

  useInit(async () => {
    await store.get('catalog').initParams();
  }, [], {backForward: true});

  const {t} = useTranslate();

  const profile = useSelector((state) => state.profile);
  const logout = useCallback(() => store.get('profile').logout(profile), []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if(token && !profile.isLogin) store.get('profile').auth(token);
  }, []);

  return (
    <Layout auth={<LoginHead profile={profile} logout={logout}/>} head={
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

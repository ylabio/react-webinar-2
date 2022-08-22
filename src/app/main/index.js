import React, {useEffect, useCallback} from "react";
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
import HeaderLogin from "../../components/header-login";

function Main() {
  const store = useStore();

  useInit(async () => {
    await store.get('catalog').initParams();
  }, [], {backForward: true});

  let user = useSelector((state) => state.user);

  useEffect(() => {
    let token = localStorage.getItem("token");
    if(token && !user.logined) store.get('user').auth(token);
  }, [])

  const logout = useCallback(() => store.get('user').logOut(user));

  const {t} = useTranslate();

  return (
    <Layout head={
      <LayoutFlex flex="between">
        <h1>{t('title')}</h1>
        <LocaleSelect/>
      </LayoutFlex>
    }
    login={<HeaderLogin user={user} logout={logout}/>}
      >
      <Tools/>
      <CatalogFilter/>
      <CatalogList/>
    </Layout>
  )
}

export default React.memo(Main);

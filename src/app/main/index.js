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
import AuthControls from "../../components/auth-controls";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../../utils/coockie";
import Spinner from "../../components/spinner";
import useSelector from "../../hooks/use-selector";

function Main() {
  const navigate = useNavigate();
  const store = useStore();
  const token = getCookie('token');
  const name = localStorage.getItem('name');

  const select = useSelector(state => ({
    waiting: state.user.waiting,
  }));

  const callbacks = {
    redirect: () => { navigate('/authorization') },
    logout: useCallback(() => store.get('user').logout(token), [])
  }

  useInit(async () => {
    await store.get('catalog').initParams();
  }, [], {backForward: true});

  const {t} = useTranslate();

  return (
    <Layout
      control={
        <AuthControls
          token={token}
          name={name}
          logout={callbacks.logout}
          redirect={callbacks.redirect}
        />
      }
      head={
        <LayoutFlex flex="between">
          <h1>{t('title')}</h1>
          <LocaleSelect/>
        </LayoutFlex>
    }>
      <Spinner active={select.waiting}>
        <Tools/>
        <CatalogFilter/>
        <CatalogList/>
      </Spinner>
    </Layout>
  )
}

export default React.memo(Main);

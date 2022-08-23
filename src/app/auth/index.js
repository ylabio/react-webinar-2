import React, {useCallback, useMemo} from "react";
import useStore from "../../hooks/use-store";
import useInit from "../../hooks/use-init";
import useTranslate from "../../hooks/use-translate";
import CatalogFilter from "../../containers/catalog-filter";
import CatalogList from "../../containers/catalog-list";
import Tools from "../../containers/tools";
import LayoutFlex from "../../components/layout-flex";
import Layout from "../../components/layout";
import LocaleSelect from "../../containers/locale-select";
import AuthForm from "../../components/auth-form";
import Prehead from "../../containers/prehead";

function Auth() {
  const store = useStore();

  const {t} = useTranslate();


  const callbacks = {
    onAuth: useCallback(
      (login, password) => store.get("user").authorize(login, password),
      []
    ),
  };

  return (
    <Layout prehead={<Prehead/>} head={
      <LayoutFlex flex="between">
        <h1>{t('title')}</h1>
        <LocaleSelect/>
      </LayoutFlex>
    }>
      <AuthForm onAuth={callbacks.onAuth}/>
    </Layout>
  )
}

export default React.memo(Auth);

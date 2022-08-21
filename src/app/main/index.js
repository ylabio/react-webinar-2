import React, { Fragment, useCallback } from "react";
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
import LoginBar from "../../components/login-bar";

function Main() {
  const store = useStore();

  useInit(async () => {
    await store.get('catalog').initParams();
  }, [], { backForward: true });

  useInit(async () => {
    await store.get('authorization').choiceProfile();
  }, []);

  const select = useSelector(state => ({
    user: state.authorization.name
  }));

  const callback = {
    exit: useCallback(() => store.get('authorization').logOut(), []),
  }


  const { t } = useTranslate();

  return (
    <Fragment>
      <LoginBar userName={select.user} logOut={callback.exit} />
      <Layout head={
        <LayoutFlex flex="between">
          <h1>{t('title')}</h1>
          <LocaleSelect />
        </LayoutFlex>
      }>
        <Tools />
        <CatalogFilter />
        <CatalogList />
      </Layout>
    </Fragment>
  )
}

export default React.memo(Main);

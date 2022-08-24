import React from "react";
import useStore from "../../hooks/use-store";
import useInit from "../../hooks/use-init";
import useTranslate from "../../hooks/use-translate";
import CatalogFilter from "../../containers/catalog-filter";
import CatalogList from "../../containers/catalog-list";
import Tools from "../../containers/tools";
import Layout from "../../components/layout";
import useSelector from "../../hooks/use-selector";
import Header from "../../containers/header";

function Main() {
  const store = useStore();

  const select = useSelector((state) => ({
    loggedIn: state.profile.loggedIn,
  }));

  useInit(
    async () => {
      await store.get("catalog").initParams();
      await store.get("categories").loadCategories();
    },
    [],
    { backForward: true }
  );

  const { t } = useTranslate();

  return (
    <Layout head={<Header loggedIn={select.loggedIn} />}>
      <Tools />
      <CatalogFilter />
      <CatalogList />
    </Layout>
  );
}

export default React.memo(Main);

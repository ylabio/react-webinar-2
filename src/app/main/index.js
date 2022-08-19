import React from "react";
import useStore from "../../hooks/use-store";
import useInit from "../../hooks/use-init";
import useTranslate from "../../hooks/use-translate";
import CatalogFilter from "../../containers/catalog-filter";
import CatalogList from "../../containers/catalog-list";
import Tools from "../../containers/tools";
import LayoutFlex from "../../components/layout-flex";
import Layout from "../../components/layout";
import LocaleSelect from "../../containers/locale-select";
import UserMenu from "../../components/user-menu";
import TopMenu from "../../components/top-menu";

function Main() {
  const store = useStore();

  useInit(
    async () => {
      await store.get("catalog").initParams();
      await store.get("categories").load();
    },
    [],
    { backForward: true }
  );

  const { t } = useTranslate();

  return (
    <>
      <UserMenu />
      {/* <TopMenu>
        <UserMenu />
      </TopMenu> */}
      <Layout
        head={
          <LayoutFlex flex="between">
            <h1>{t("title")}</h1>
            <LocaleSelect />
          </LayoutFlex>
        }
      >
        <Tools />
        <CatalogFilter />
        <CatalogList />
      </Layout>
    </>
  );
}

export default React.memo(Main);

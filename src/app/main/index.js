import React from "react";
import useStore from "../../hooks/use-store";
import useInit from "../../hooks/use-init";
import useTranslate from "../../hooks/use-translate";
import CatalogFilter from "../../containers/catalog-filter";
import CatalogList from "../../containers/catalog-list";
import PageLayout from "../../components/layouts/page-layout";
import useSelector from "../../hooks/use-selector";

function Main() {
  const store = useStore();

  useInit(
    async () => {
      await store.get("catalog").initParams();
      await store.get("category").load();
    },
    [],
    { backForward: true }
  );

  const { t } = useTranslate();

  return (
    <PageLayout title={t("title")}>
      <CatalogFilter />
      <CatalogList />
    </PageLayout>
  );
}

export default React.memo(Main);

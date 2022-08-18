import Layout from "../../components/layout";
import React, {useCallback, useMemo} from "react";
import useStore from "../../hooks/use-store";
import useInit from "../../hooks/use-init";
import CatalogFilter from "../../containers/catalog-filter";
import CatalogList from "../../containers/catalog-list";
import Tools from "../../containers/tools";
import useSelector from "../../hooks/use-selector";
import Select from "../../components/select";
import LayoutFlex from "../../components/layout-flex";
import translate from "../../utils/translate";
import useTranslate from "../../hooks/use-translate";
import LocaleSelect from "../../containers/locale-select";

function Main() {
  const store = useStore();

  useInit(async () => {
    await store.get('catalog').initParams();
  }, [], {backForward: true});

  const {t} = useTranslate();

  return (
    <Layout head={
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

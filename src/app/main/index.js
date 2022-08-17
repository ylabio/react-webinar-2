import Layout from "../../components/layout";
import React, {useMemo} from "react";
import useStore from "../../utils/use-store";
import useInit from "../../utils/use-init";
import CatalogFilter from "../../containers/catalog-filter";
import CatalogList from "../../containers/catalog-list";
import Tools from "../../containers/tools";
import useI18n from "../../i18n/use-i18n";
import LayoutFlex from "../../components/layout-flex";
import Select from "../../components/select";

function Main() {
  const store = useStore();

  const i18n = useI18n();

  useInit(async () => {
    await store.get('catalog').initParams();
    i18n.setLang('en');
  }, [], {backForward: true});

  // Опции для полей
  const options = {
    lang: useMemo(() => ([
      {value: 'ru', title: 'Русский'},
      {value: 'en', title: 'English'},
    ]), [])
  };

  return (
    <Layout head={
      <LayoutFlex flex="between">
        <h1>{i18n.translate('title')}</h1>
        <Select onChange={i18n.setLang} value={i18n.lang} options={options.lang}/>
      </LayoutFlex>}>
      <Tools/>
      <CatalogFilter/>
      <CatalogList/>
    </Layout>
  )
}

export default React.memo(Main);

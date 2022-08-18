import Layout from "../../components/layout";
import React, {useCallback, useMemo} from "react";
import useStore from "../../utils/use-store";
import useInit from "../../utils/use-init";
import CatalogFilter from "../../containers/catalog-filter";
import CatalogList from "../../containers/catalog-list";
import Tools from "../../containers/tools";
import useSelector from "../../utils/use-selector";
import Select from "../../components/select";
import LayoutFlex from "../../components/layout-flex";
import translate from "../../utils/translate";

function Main() {
  const store = useStore();

  useInit(async () => {
    await store.get('catalog').initParams();
  }, [], {backForward: true});

  const select = useSelector(state => ({
    lang: state.locale.lang
  }));

  const callbacks = {
    setLang: useCallback(lang => store.get('locale').setLang(lang), []),
  }

  const options = {
    lang: useMemo(() => ([
      {value: 'ru', title: 'Русский'},
      {value: 'en', title: 'English'},
    ]), [])
  };

  return (
    <Layout head={
      <LayoutFlex flex="between">
        <h1>{translate(select.lang, 'title')}</h1>
        <Select onChange={callbacks.setLang} value={select.lang} options={options.lang}/>
      </LayoutFlex>
    }>
      <Tools/>
      <CatalogFilter/>
      <CatalogList/>
    </Layout>
  )
}

export default React.memo(Main);

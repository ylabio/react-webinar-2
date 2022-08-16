import React, {useCallback, useMemo} from "react";
import Layout from "../../components/layout";
import Menu from "../../components/menu";
import NotFound from "../../components/not-found";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import Head from "../../components/head";
import translate from "../../utils/translate";
import allCodes from "../../utils/translate/codes";

function EmptyPage() {
  
  // коды для мультиязычности которые передаются через пропсы для глупых компонентов  
  const codes = useMemo(() => JSON.parse(JSON.stringify(allCodes)), []);
  
  const store = useStore();

  const select = useSelector(state => ({
    language: state.localization.language
  }));
  
  const callbacks = {
    // Смена языка сайта
    changeLanguage: useCallback(language => store.get('localization').changeLanguage(language), [])
  };

  return (
    <Layout head={<Head language={select.language} changeLanguage={callbacks.changeLanguage} title={translate(select.language, 'SHOP')} translate={translate} codesHead={codes.head}/> }>
      <Menu language={select.language} translate={translate} codesMenu={codes.menu}/>
      <NotFound language={select.language} codesNotFound={codes.notFound} translate={translate}/>
    </Layout>
  )
}

export default EmptyPage;
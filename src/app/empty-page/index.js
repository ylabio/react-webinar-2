import React, {useCallback} from "react";
import Layout from "../../components/layout";
import Menu from "../../components/menu";
import NotFound from "../../components/not-found";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import Head from "../../components/head";
import changeLanguage from "../../utils/changeLanguage";

function EmptyPage() {

  const store = useStore();

  const select = useSelector(state => ({
    language: state.localization.language
  }));
  
  const callbacks = {
    // Смена языка сайта
    changeLanguage: useCallback(language => store.get('localization').changeLanguage(language), [])
  };

  return (
    <Layout head={<Head language={select.language} changeLanguage={callbacks.changeLanguage} title={changeLanguage(select.language, 'SHOP')}/>}>
      <Menu language={select.language}/>
      <NotFound language={select.language}/>
    </Layout>
  )
}

export default EmptyPage;
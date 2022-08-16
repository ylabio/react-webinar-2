import Layout from "../../components/layout";
import React, {useCallback, useEffect} from "react";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import Page from "../../components/page";
import Preloader from "../../components/preloader";
import { useParams } from "react-router";
import Header from "../../components/header";
import { translate } from "../../utils/translate";
import LanguageSwitch from "../../components/language-switch";

function Article(){

  console.log('Article');

  const store = useStore();

  const select = useSelector(state => ({
    loading: state.page.loading,
    item: state.page.page,
    valLang: state.names.val
  }));

  const translations = {
    addButtonName: translate(select.valLang, 'addButtonName'),
    producingCountry: translate(select.valLang, 'producingCountry'),
    category: translate(select.valLang, 'category'),
    releaseYear: translate(select.valLang, 'releaseYear'),
    price: translate(select.valLang, 'price')
  }

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback((_id) => store.get('basket').addToBasket(_id), []),
    // Изменение языка
    changeLanguage: useCallback((value) => store.get('names').changeLanguage(value), [])
  };
  const { id } = useParams();
 
  useEffect(() => {
    store.get('page').pageLoad(id);
  }, [id]);

  return (
    <>  
      <Layout head={!select.loading?<h1>{select.item.title}</h1>:''} 
              right={<LanguageSwitch changeLanguage={callbacks.changeLanguage} val={select.valLang}/>}>
        <Header/>
        {select.loading ? 
          <Preloader/>
          :
          <Page addToBasket={callbacks.addToBasket}
                item={select.item}
                addButtonName={translations.addButtonName}
                producingCountry={translations.producingCountry}
                category={translations.category}
                releaseYear={translations.releaseYear}
                price={translations.price}
          />
        }
      </Layout>
    </>
  )
}

export default React.memo(Article);

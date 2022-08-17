import List from "../../components/list";
import Layout from "../../components/layout";
import React, {useCallback, useEffect} from "react";
import Item from "../../components/item";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import Paginator from "../../components/paginator";
import Preloader from "../../components/preloader";
import { translate } from "../../utils/translate";
import LanguageSwitch from "../../components/language-switch";
import ContainerMenuBasketSimple from "../../containers/container-menu-basket-simple";

function Main(){

  console.log('Main');

  const store = useStore();
 
  const select = useSelector(state => ({
    items: state.catalog.items,
    pagesCount: state.catalog.pagesCount,
    page: state.catalog.page,
    loading: state.catalog.loading,
    valLang: state.names.val
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
    // Загрузка списка товаров
    load: useCallback(() => store.get('catalog').load(), []),
    // Изменение языка
    changeLanguage: useCallback((value) => store.get('names').changeLanguage(value), []),
    // Изменение номера текущей страницы
    changeCurrentPage: useCallback((page) => store.get('catalog').changeCurrentPage(page), [])
  };

   const translations = {
     addButtonName: translate(select.valLang, 'addButtonName'),
     mainHead: translate(select.valLang, 'mainHead')
   }

  useEffect(() => {
    store.get('catalog').load();
  }, [select.page])

  const renders = {
    item: useCallback(item => <Item item={item}
                                    onAdd={callbacks.addToBasket}
                                    link={`/articles/${item._id}`}
                                    addButtonName={translations.addButtonName}
                              />, [translations.addButtonName]),
  }

  return (
    <Layout head={<h1>{translations.mainHead}</h1>} 
            right={<LanguageSwitch changeLanguage={callbacks.changeLanguage} val={select.valLang}/>}>
      <ContainerMenuBasketSimple/>
        {select.loading ?
          <Preloader/>
        :
          <List items={select.items} renderItem={renders.item}/>}
      <Paginator pagesCount={select.pagesCount}
                 page={select.page}
                 changeCurrentPage={callbacks.changeCurrentPage}
      />
    </Layout>
  )
}

export default React.memo(Main);

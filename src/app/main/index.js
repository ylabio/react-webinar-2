import BasketSimple from "../../components/basket-simple";
import List from "../../components/list";
import Layout from "../../components/layout";
import React, {useCallback, useEffect} from "react";
import Item from "../../components/item";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import ListPagination from "../../components/list-pagination";
import Select from "../../components/language-select";

function Main() {
  
  console.log('Main');
  
  const store = useStore();
  
  const select = useSelector(state => ({
    items: state.catalog.items,
    currentPage: state.catalog.currentPage,
    totalItems: state.catalog.totalItems,
    amount: state.basket.amount,
    sum: state.basket.sum,
    language: state.translation.language,
    words: state.translation.words
  }));

  useEffect(() => {
    store.get('catalog').load();
  }, [select.currentPage])

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
    // Переключение страницы
    switchPage: useCallback((page) => store.get('catalog').switchPage(page), []),
    // Получение данных товара
    getProductInformation: useCallback((id) => store.get('product').getProductInformation(id), []),
    // Получение данных товара
    changeLanguage: useCallback((language) => store.get('translation').changeLanguage(language), [])
  };

  const renders = {
    item: useCallback(item => <Item item={item} onAdd={callbacks.addToBasket} getProductInformation={callbacks.getProductInformation} words={{add: select.words.add}}/>, [select.language]),
  }
  return (
    <Layout head={<><h1>{select.words.shop}</h1><Select changeLanguage={callbacks.changeLanguage} language={select.language}/></>}>
      <BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} words={
        {
          main: select.words.main,
          inCart: select.words.inCart,
          empty: select.words.empty,
          item: select.words.item,
          goTo: select.words.goTo
        }
      }/>
        <>
          <List items={select.items} renderItem={renders.item} paginationData={{
            totalItems: select.totalItems,
            currentPage: select.currentPage,
            switchPage: callbacks.switchPage
          }}/>
          <ListPagination
            currentPage={select.currentPage}
            switchPage={callbacks.switchPage}
            totalItems={select.totalItems}/>
        </>
    </Layout>
  )
}

export default React.memo(Main);

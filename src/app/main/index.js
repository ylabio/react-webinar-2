import BasketSimple from "../../components/basket-simple";
import List from "../../components/list";
import Layout from "../../components/layout";
import React, {useCallback, useEffect} from "react";
import Item from "../../components/item";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import {config} from '../../config';
import Pagination from "../../components/pagination";
import Header from "../../components/header";

function Main(){
  const store = useStore();
  const select = useSelector(state => ({
    items: state.catalog.items,
    total: state.catalog.total,
    amount: state.basket.amount,
    sum: state.basket.sum,
    currentPage: state.catalog.currentPage,
    language: state.language.language,
  }));

  useEffect(() => {
    const skip = (select.currentPage - 1) * config.API_LIMIT;
    store.get('catalog').getGoods(skip);
  }, [select.language])

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
    changeLanguage: useCallback(lang => store.get('language').changeLanguage(lang), []),
  };

  const renders = {
    item: useCallback(item => <Item 
      item={item} 
      onAdd={callbacks.addToBasket}
      lang={select.language}
    />, [select.language]),
  }

  return (
    <Layout head={
      <Header 
        title='Магазин' 
        changeLanguage={callbacks.changeLanguage} 
        lang={select.language}
      />
    }>
      <BasketSimple 
        onOpen={callbacks.openModalBasket} 
        amount={select.amount} 
        sum={select.sum}
        lang={select.language}
      />
      <List items={select.items} renderItem={renders.item}/>
      <Pagination
         total={select.total} 
         currentPage={select.currentPage}
         getGoods={store.get('catalog').getGoods.bind(store.get('catalog'))}
         changeCurrentPage={store.get('catalog').changeCurrentPage.bind(store.get('catalog'))} 
      />
    </Layout>
  )
}

export default React.memo(Main);

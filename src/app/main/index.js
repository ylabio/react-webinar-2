import BasketSimple from "../../components/basket-simple";
import List from "../../components/list";
import Layout from "../../components/layout";
import React, {useCallback, useEffect} from "react";
import Item from "../../components/item";
import Paginator from "../../components/paginator";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import {langVars} from '../../utils/localisation'
import Header from './../../components/header';

function Main(){

  console.log('Main');

  const store = useStore();
  
  const select = useSelector(state => ({
    items: state.catalog.items,
    totalCount: state.catalog.totalCount,
    currentPage: state.catalog.currentPage,
    pageSize: state.catalog.pageSize,
    language: state.catalog.language,
    
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  useEffect(() => {
    store.get('catalog').load();
  }, [select.pageSize, select.currentPage]);
  
  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
    changePage: useCallback(page => store.get('catalog').changePage(page), [])
  };

  const renders = {
    item: useCallback(item => <Item lang={select.language} item={item} onAdd={callbacks.addToBasket} link={`articles/${item._id}`}/>, [ select.language]),
  }

  return (
    <Layout head={<Header title={langVars.main.heading[select.language]}/>}>
      <BasketSimple lang={select.language} onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
      <List items={select.items} renderItem={renders.item}/>
      <Paginator 
      itemsAmount={select.totalCount}
      currentPage={select.currentPage}
      callback={callbacks.changePage}
      range={3}
      itemsOnPage={select.pageSize}/>
    </Layout>
  )
}

export default React.memo(Main);

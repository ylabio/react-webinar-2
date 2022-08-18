import BasketSimple from "../../components/basket-simple";
import List from "../../components/list";
import Layout from "../../components/layout";
import React, {useCallback, useEffect, useState} from "react";
import Item from "../../components/item";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import Pagination from "../../components/pagination";
import Menu from "../../components/menu"

function Main(){

  console.log('Main');



  const store = useStore();
  const select = useSelector(state => ({
    items: state.catalog.items,
    amount: state.basket.amount,
    sum: state.basket.sum,
    count: state.catalog.count,
    currentPage:state.catalog.currentPage,
  }));

  useEffect(() => {
    console.log(select, "useEffect");
    store.get('catalog').switchPage();

  }, [select.currentPage]);



  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback((_id) => store.get('basket').addToBasket(_id), []),
    getPage:useCallback((page)=>store.get('catalog').setPageNumber(page),[]),
  };


  const renders = {
    item: useCallback(item => <Item item={item} onAdd={callbacks.addToBasket} url={`/article/${item._id}`}/>, []),
  }

  return (
    <Layout head={<h1>Магазин</h1>}>
      <Menu/>
      <BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
      <List items={select.items} renderItem={renders.item} />
      <Pagination count={select.count} getItems={callbacks.getPage} currentPage={select.currentPage} />
    </Layout>
  )
}

export default React.memo(Main);

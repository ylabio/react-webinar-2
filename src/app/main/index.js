import BasketSimple from "../../components/basket-simple";
import List from "../../components/list";
import Layout from "../../components/layout";
import React, {useCallback, useEffect} from "react";
import Item from "../../components/item";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import Paginator from "../../components/paginator";

function Main(){

  console.log('Main');

  const store = useStore();

  const select = useSelector(state => ({
    items: state.catalog.items,
    count: state.catalog.count,
    pageSize: state.catalog.pageSize,
    currentPage: state.catalog.currentPage,
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
    //Переключение страницы каталога
    onPageChanged: useCallback(pageNumber => store.get('catalog').onPageChanged(pageNumber), []),
    //Переход на первую страницу каталога
    toFirstPage: useCallback(_id => store.get('catalog').onPageChanged(1), [])
  };

  const renders = {
    item: useCallback(item => <Item item={item} onAdd={callbacks.addToBasket}/>, []),
  }

  return (
    <Layout head={<h1>Магазин</h1>}>
      <BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} toFirstPage={callbacks.toFirstPage}/>
      <List items={select.items} renderItem={renders.item}/>
      <Paginator totalItemsCount={select.count}
                 pageSize={select.pageSize}
                 currentPage={select.currentPage}
                 onPageChanged={callbacks.onPageChanged}/>
    </Layout>
  )
}

export default React.memo(Main);

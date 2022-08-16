import BasketSimple from "../../components/basket-simple";
import List from "../../components/list";
import Layout from "../../components/layout";
import Pagination from "../../components/pagination";
import React, {useCallback, useEffect} from "react";
import Item from "../../components/item";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import { Link, BrowserRouter as Router, Route, useParams } from "react-router-dom";

function Main(){
  let params = useParams();

  console.log('Main');
  console.log('ItemPage');
  console.log(params.pageNumber);

  const store = useStore();

  const select = useSelector(state => ({
    items: state.catalog.items,
    amount: state.basket.amount,
    sum: state.basket.sum,
    pagesCount: state.pagination.pagesCount,
    itemsOnPage: state.pagination.itemsOnPage,
    currentPage: state.pagination.currentPage,
  }));

  useEffect(() => {
    store.get('pagination').calculatePagesCount(select.itemsOnPage);
  })

  useEffect(() => {
    store.get('pagination').goToPage(params.pageNumber);
  })

  useEffect(() => {
    store.get('catalog').loadPage(select.itemsOnPage, select.currentPage);
  }, [select.currentPage])
  

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
  };

  const renders = {
    item: useCallback(item => <Item item={item} onAdd={callbacks.addToBasket}/>, []),
  }
  console.log("select.currentPage")
  console.log(select.currentPage)
  return (
    <Layout head={<h1>Магазин</h1>}>
      <BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
      <List items={select.items} renderItem={renders.item}/>
      <Pagination pagesCount={select.pagesCount} currentPage={select.currentPage ? select.currentPage : 1} goToPage={callbacks.goToPage}/>
    </Layout>
  )
}

export default React.memo(Main);

import {useParams} from "react-router-dom";
import Pagination from "../../components/pagination";
import BasketSimple from "../../components/basket-simple";
import List from "../../components/list";
import Layout from "../../components/layout";
import React, {useCallback, useEffect} from "react";
import Item from "../../components/item";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import Menu from "../../components/main-link";

function Main(){
  console.log('Main');
  const PRODUCTS_PER_PAGE = 10;
  const store = useStore();
  let { pageNumber } = useParams();
  pageNumber = Number(pageNumber);

  useEffect(() => {
    store.get('catalog').loadPreviews(pageNumber);
  }, [pageNumber])

  const select = useSelector(state => ({
    items: state.catalog.items,
    amount: state.basket.amount,
    sum: state.basket.sum,
    catalogSize: state.catalog.size,
  }));
  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
  };
  const renders = {
    item: useCallback(item => <Item item={item} onAdd={callbacks.addToBasket}/>, []),
  }
  return (
    <Layout head={<h1>Магазин</h1>}>
      <Menu />
      <BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
      <List items={select.items} renderItem={renders.item}/>
      <Pagination
        amount={Math.round(select.catalogSize / PRODUCTS_PER_PAGE)}
        pageNumber={pageNumber || 1}
      />
    </Layout>
  )
}
export default React.memo(Main);
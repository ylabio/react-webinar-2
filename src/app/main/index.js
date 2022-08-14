import BasketSimple from "../../components/basket-simple";
import List from "../../components/list";
import Layout from "../../components/layout";
import React, {useCallback, useEffect, useState} from "react";
import Item from "../../components/item";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import Pagination from "../../components/pagination";

function Main(){

  console.log('Main');

  const store = useStore();

  useEffect(() => {
    store.get('catalog').load();
  }, []);

  let curPage = useSelector(state => state.catalog.currentPage)

  const [currentPage, setCurrentPage] = useState(curPage);
  useEffect(() => {
    store.get('catalog').loadPage(currentPage);
  }, [currentPage]);
  const select = useSelector(state => {
    return {
    items: state.catalog.items,
    totalPages: state.catalog.totalPages,
    amount: state.basket.amount,
    sum: state.basket.sum
  }});

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
      <BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
      <List items={select.items} renderItem={renders.item}/>
      <Pagination currentPage={currentPage} totalPages={select.totalPages} setCurrentPage={setCurrentPage} />
    </Layout>
  )
}

export default React.memo(Main);

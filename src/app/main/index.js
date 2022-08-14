import BasketSimple from "../../components/basket-simple";
import List from "../../components/list";
import Layout from "../../components/layout";
import React, { useCallback, useEffect } from "react";
import Item from "../../components/item";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import Article from "../../components/article";
import Pagination from "../../components/pagination";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


function Main() {

  console.log('Main');

  const store = useStore();

  useEffect(() => {
    store.get('catalog').load();
  }, [])

  const select = useSelector(state => ({
    items: state.catalog.items,
    amount: state.basket.amount,
    sum: state.basket.sum,
    _id: state.article._id,
    item: state.article.item,
    count: state.catalog.count
  }));

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
    // Добавление id элемента для запроса
    addIdForRequest: useCallback(_id => store.get('article').getId(_id), []),
    toPaginate: useCallback((skip) => store.get('catalog').paginate(skip), []),
    resetItemState: useCallback(() => store.get('article').resetItemState(), []),
  };

  const renders = {
    item: useCallback(item => <Item item={item} addId={callbacks.addIdForRequest} onAdd={callbacks.addToBasket} />, []),
  }

  return (
    <Layout head={<h1>{select.item.title ? select.item.title : 'Магазин'}</h1>}>
      <Routes>
        <Route path="/" element={
          <>
            <BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
            <List items={select.items} renderItem={renders.item} />
            <Pagination count={select.count} paginate={callbacks.toPaginate} />
          </>
        } />
        <Route path={select._id} element={
          <>
            <BasketSimple onOpen={callbacks.openModalBasket}
              resetItemState={callbacks.toresetItemState}
              onAdd={callbacks.addToBasket}
              amount={select.amount}
              sum={select.sum} />
            <Article onAdd={callbacks.addToBasket} item={select.item} />
          </>
        } />
      </Routes>
    </Layout>
  )
}

export default React.memo(Main);

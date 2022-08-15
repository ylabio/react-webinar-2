import BasketSimple from "../../components/basket-simple";
import List from "../../components/list";
import Layout from "../../components/layout";
import React, { useCallback, useEffect } from "react";
import Item from "../../components/item";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import ItemPage from "../../components/item-page";
import Pagination from "../../components/pagination";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom"

function Main() {

  const store = useStore();

  useEffect(() => {
    store.get('catalog').load();
  }, [])

  const select = useSelector(state => ({
    items: state.catalog.items,
    amount: state.basket.amount,
    sum: state.basket.sum,
    _id: state.product_page._id,
    item: state.product_page.item,
    count: state.catalog.count
  }));

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),

    addIdForRequest: useCallback(_id => store.get('product_page').getId(_id), []),

    toNullForItemState: useCallback(() => store.get('product_page').toNull(), []),

    toPaginate: useCallback((skip) => store.get('catalog').paginate(skip), []),
  };

  const renders = {
    item: useCallback(item => <Item item={item} onAdd={callbacks.addToBasket} addId={callbacks.addIdForRequest} />, []),
  }

  return (
    <Layout head={<h1>{select.item.title ? select.item.title : 'Магазин'}</h1>}>
      <Routes>
        <Route path="/" element={
          <>
            <BasketSimple
              onOpen={callbacks.openModalBasket}
              amount={select.amount}
              sum={select.sum}
            />
            <List
              items={select.items}
              renderItem={renders.item}
            />
            <Pagination
              count={select.count}
              paginate={callbacks.toPaginate}
            />
          </>
        } />
        <Route path={select._id} element={
          <>
            <BasketSimple
              onOpen={callbacks.openModalBasket}
              toNull={callbacks.toNullForItemState}
              onAdd={callbacks.addToBasket}
              amount={select.amount}
              sum={select.sum}
            />,
            <ItemPage
              onAdd={callbacks.addToBasket}
              item={select.item}
            />
          </>
        } />
      </Routes>
    </Layout>
  )
}

export default React.memo(Main);

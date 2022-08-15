
import BasketSimple from "../../components/basket-simple";
import List from "../../components/list";
import Layout from "../../components/layout";
import React, { useCallback, useEffect, useState,useContext } from "react";
import Item from "../../components/item";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import { Routes, Route, Link } from 'react-router-dom'
import Pagination from "../pagination";
import './style.css'
import ListAndPagination from "../../components/list-pagination";
import InfoItem from "../../components/info-item";
import { ContextTitle } from './../../store/contextTitle';
function Main() {
  const select = useSelector(state => ({
    items: state.catalog.items,
    amount: state.basket.amount,
    sum: state.basket.sum,
    lengthItems: state.catalog.lengthItems,
    cuurentItem: state.catalog.cuurentItem,
  }));
  const {title,setTitle} = useContext(ContextTitle)
  const store = useStore();
  useEffect(() => {
    store.get('catalog').getItems()
  }, [])


  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
    getItemById: useCallback(id => store.get('catalog').getItemById(id), []),
  };

  const renders = {
    item: useCallback(item => <Item setTitle={setTitle} item={item} onAdd={callbacks.addToBasket} />, []),
  }
  return select.items.length > 0 ? (<>

    <Layout head={<h1>{title}</h1>}>
      <BasketSimple setTitle={setTitle} onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />

      <Routes>
        <Route path="/" element={
          <ListAndPagination

            items={select.items}
            renderItem={renders.item}
            lengthItems={select.lengthItems}
          />} />
        <Route path="info/:id" element={<InfoItem />} />

      </Routes>
    </Layout>
  </>

  ) :
    <div className="Loading" >
      <p>Идет загрузка...</p>
    </div>
}

export default React.memo(Main);

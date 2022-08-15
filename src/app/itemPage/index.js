import BasketSimple from "../../components/basket-simple";
import Layout from "../../components/layout";
import ItemInfo from "../../components/itemInfo";
import React, {useCallback, useEffect} from "react";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import {useLocation} from "react-router-dom";

function ItemPage(){

  console.log('ItemPage');

  const store = useStore();
  window.store = store

  const location = useLocation();

  useEffect(() => {
    store.get('catalog').loadItem(location.search.split("=")[1]);
  }, [location]);

  const select = useSelector(state => {
    return {
    item: state.catalog.item,
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


  return (
    <Layout head={<h1>{select.item.title}</h1>}>
      <BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
      <ItemInfo item={select.item} onAdd={callbacks.addToBasket} />
    </Layout>
  )
}

export default React.memo(ItemPage);

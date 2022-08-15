
import React, {useCallback, useEffect} from "react";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";
import {useLocation} from "react-router-dom";
import Layout from "../../components/layout";
import BasketSimple from "../../components/basket-simple";
import ItemData from "../../components/item-data";


function ItemPage(){
  window.store = store;
  const location = useLocation();
  const store = useStore();

  useEffect(() => {
    store.get('catalog').getItemPage(location.search.split("=")[1]);
  }, []);

  const select = useSelector(state => {
    return {
    item: state.catalog.item,
    allPages: state.catalog.allPages,
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
      <ItemData item={select.item} onAdd={callbacks.addToBasket} />
    </Layout>
  )
}

export default React.memo(ItemPage);
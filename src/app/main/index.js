import React, { useCallback } from "react";
import { Outlet } from 'react-router-dom';
import Layout from "../../components/layout";
import BasketSimple from "../../components/basket-simple";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";

function Main(){
  // console.log('Main');
  const store = useStore();

  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
  };

  return (
    <Layout head={<h1>Магазин</h1>}>
      <BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
      <Outlet />
    </Layout>
  )
}

export default React.memo(Main);

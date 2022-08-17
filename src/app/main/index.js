import React, { useCallback } from "react";
import { Outlet } from 'react-router-dom';
import Layout from "../../components/layout";
import BasketSimple from "../../components/basket-simple";
import HeaderNav from "../../components/header-nav";
import useStore from "../../utils/use-store";
import useSelector from "../../utils/use-selector";

function Main() {
  const store = useStore();

  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
    name: state.product.name,
  }));

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
  };

  return (
    <Layout head={<h1>{select.name || 'Магазин'}</h1>}>
      <HeaderNav />
      <BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
      <Outlet />
    </Layout>
  )
}

export default React.memo(Main);

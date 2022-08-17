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
    <Layout
      title={select.name || 'Магазин'}
      nav={<HeaderNav />}
      actions={<BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />}
      content={<Outlet />}
    />
  )
}

export default React.memo(Main);

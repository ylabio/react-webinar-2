import React, { useCallback } from "react";
import BasketSimple from "../../components/basket-simple";
import Layout from "../../components/layout";
import useSelector from "../../utils/use-selector";
import useStore from "../../utils/use-store";
import Product from "./product";

function PageInfo() {
  const store = useStore();

  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  const callbacks = {
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
  };

  return (
    <Layout head={<h1>Название товара</h1>}>
      <BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
      <Product />
    </Layout>
  )
}

export default React.memo(PageInfo);

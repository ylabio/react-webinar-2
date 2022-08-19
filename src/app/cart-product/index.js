import Controls from "components/controls";
import Loading from "components/loading";
import NotFounts from "components/not-founts";
import React, {useCallback, useEffect} from "react";
import Cart from "components/cart";
import {useParams} from "react-router-dom";
import Layout from "../../components/layout";
import useSelector from "../../utils/use-selector";
import useStore from "../../utils/use-store";

function CartProduct() {
  console.log('CartProduct');

  const {id} = useParams();
  const store = useStore();

  useEffect(() => {
    store.get('cart').loadProduct(id);
  }, [id]);

  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
    item: state.cart.item,
  }));

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback(id => store.get('basket').addToBasket(id), []),
  };

  if (select.isLoading) {
    return (
      <Layout head={''}>
        <Loading/>
      </Layout>
    )
  }

  return (
    <Layout head={<h1>{select.item === null ? '' : select.item.title}</h1>}>
      <Controls amount={select.amount} sum={select.sum} onOpen={callbacks.openModalBasket}/>
      {select.item !== null ? <Cart item={select.item} onAdd={callbacks.addToBasket}/> :
        <NotFounts/>}
    </Layout>
  );
}

export default React.memo(CartProduct);

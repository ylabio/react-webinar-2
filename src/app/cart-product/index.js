import React, {useCallback, useEffect} from "react";
import Cart from "components/cart";
import {useParams} from "react-router-dom";
import BasketSimple from "../../components/basket-simple";
import Layout from "../../components/layout";
import useSelector from "../../utils/use-selector";
import useStore from "../../utils/use-store";

function CartProduct() {
  console.log('CartProduct');

  const { id } = useParams();
  const store = useStore();

  useEffect(()=> {
    store.get('catalog').loadProduct(id);
  },[]);

  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
    item: state.catalog.item
  }));

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback(id => store.get('basket').addToBasket(id), []),
  };

  return (
    <Layout head={<h1>{select.item.title}</h1>}>
      <BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount}
                    sum={select.sum}/>
      <Cart item={select.item} onAdd={callbacks.addToBasket} />
    </Layout>
  );
}

export default React.memo(CartProduct);

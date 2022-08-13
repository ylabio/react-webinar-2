import React, { useEffect, useCallback } from "react";
import {useParams} from "react-router-dom";
import useStore from "../../utils/use-store";
import SingleProductLayout from "../../components/single-product-layout";
import useSelector from "../../utils/use-selector";
import Layout from "../../components/layout";
import BasketSimple from "../../components/basket-simple";
import Spinner from "../../components/spinner";

function SingleProductPage() {
  const {id} = useParams();
  const store = useStore();

  useEffect(() => {
    return () => store.get('product').clear()
  }, []);

  useEffect(() => {
    store.get('product').load(id)
  }, [id]);

  const select = useSelector(state => ({
    item: state.product.item,
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
  };

  return(
    <Layout head={<h1>{select.item && select.item.title}</h1>}>
      <BasketSimple amount={select.amount} sum={select.sum} onOpen={callbacks.openModalBasket}/>
      {!select.item ? 
        <Spinner/> :
        <SingleProductLayout item={select.item} onAdd={callbacks.addToBasket}/>
      }
    </Layout>
  )
}

export default SingleProductPage;
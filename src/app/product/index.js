import React, { useState, useEffect, useCallback } from 'react';
import useSelector from "../../utils/use-selector";
import useStore from "../../utils/use-store";
import {useParams} from 'react-router-dom';
import Layout from '../../components/layout';
import BasketSimple from '../../components/basket-simple';
import Product from '../../components/product'
import Loader from '../../components/loader'


function ProductCard() {
  const { id } = useParams();
  const store = useStore();
  const [isLoading, setIsLoading] = useState(true);
  /**
   * Запрос на получение данных товара
   */
  useEffect(() => {
    const test = store.get('product').load(id);
    console.log('test', test.then(test=> setIsLoading(test)));
    return ()=> console.log('Сброс')
  }, [id]);

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
  };

  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
    product: state.product.description,
  }));

  return (
   <>
      {isLoading
      ?  <Loader />
      :
      <Layout head={<h1>{select.product.title}</h1>}>
        <BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
        <Product product={select.product} addToBasket={callbacks.addToBasket}/>
      </Layout>}
   </>
  )
}

export default ProductCard;

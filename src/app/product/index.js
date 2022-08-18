import React, { useState, useEffect, useCallback } from 'react';
import useSelector from "../../utils/use-selector";
import useStore from "../../utils/use-store";
import {useParams} from 'react-router-dom';
import Layout from '../../components/layout';
import Product from '../../components/product';
import Loader from '../../components/loader';
import Controls from '../../components/controls';


function ProductCard() {
  const { id } = useParams();
  const store = useStore();
    
  /**
   * Запрос на получение данных товара
   */
  useEffect(() => {
    store.get('loader').viewLoader();
    store.get('product').load(id).then(() => {
      store.get('loader').hideLoader();
    });
    return ()=> {
      store.get('product').clearDescription();
    };
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

  // Список элементов меню. Пока оставил тут
  const navMenu = [
    {
      title: 'Главная',
      link: '/',
    },
  ];

  return (
   <>
      {!select.product
      ?  <Loader />
      :
      <Layout head={<h1>{select.product.title}</h1>}>   
        <Controls links={navMenu} onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}/>
        <Product product={select.product} addToBasket={callbacks.addToBasket}/>
      </Layout>}
   </>
  )
}

export default ProductCard;

import React, { useState } from 'react';
import { useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import useSelector from '../../utils/use-selector';
import useStore from './../../utils/use-store';
import Product from './product';
import { useRef } from 'react';
import Layout from '../../components/layout';
import BasketSimple from '../../components/basket-simple';
import { MenuBasker } from '../../components/menu/menu-basker';

const ProductsPage = () => {

  let { _id } = useParams();

  const store = useStore();


  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
    oneProduct: state.productInfo.oneProduct
  }));

  const callbacks = {
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    closeModalBasket: useCallback(() => store.get('modals').close(), []),
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
  };

  useEffect(() => {
    callbacks.closeModalBasket();
  }, [_id]);

  useEffect(() => {
    store.get('productInfo').getActicle(_id);
  }, [_id]);

  return (
    <Layout head={<h1>{select.oneProduct.title}</h1>}>
      <MenuBasker onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum}
      />
      <Product
        {...select.oneProduct}
        addToBasket={callbacks.addToBasket}
      />
    </Layout>


  );
}

export default React.memo(ProductsPage);

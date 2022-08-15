import React, { useState } from 'react';
import Layout from '../../components/layout';
import useSelector from '../../utils/use-selector';
import useStore from '../../utils/use-store';
import { useCallback, useEffect } from 'react';
import BasketSimple from '../../components/basket-simple';
import { useParams } from 'react-router-dom';
import ItemDetails from '../../components/item-details';

function ItemCard() {
  const store = useStore();
  const params = useParams();

  useEffect(() => {
    store.get('details').loadDetails(params.id);
  }, [params.id]);

  const select = useSelector((state) => ({
    details: state.details.details,
    country: state.details.country,
    category: state.details.category,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback((_id) => store.get('basket').addToBasket(_id), []),
  };

  return (
    <>
      <Layout head={<h1>{select.details.title}</h1>}>
        <BasketSimple
          onOpen={callbacks.openModalBasket}
          amount={select.amount}
          sum={select.sum}
        />
        <ItemDetails
          detail={select.details}
          country={select.country}
          category={select.category}
          addToBasket={callbacks.addToBasket}
        />
      </Layout>
    </>
  );
}

export default React.memo(ItemCard);

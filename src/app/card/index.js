import React, { useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BasketSimple from '../../components/basket-simple';
import ItemCard from '../../components/item-card';
import Layout from '../../components/layout';
import useSelector from '../../utils/use-selector';
import useStore from '../../utils/use-store';

function Card() {
  const store = useStore();
  const { id } = useParams();
  const select = useSelector(state => ({
    item: state.card.item,
    amount: state.basket.amount,
    sum: state.basket.sum
  }));

  console.log('Card');

  useEffect(() => {
    store.get('card').load(id);
  }, [id]);

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), []),
  };

  return (
    <Layout head={<h1>{select.item.title}</h1>}>
      <BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
      <ItemCard item={select.item} onAdd={callbacks.addToBasket} />
    </Layout>
  );
}

export default React.memo(Card);

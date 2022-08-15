import BasketSimple from '../../components/basket-simple';
import Layout from '../../components/layout';
import React, { useCallback } from 'react';
import useStore from '../../utils/use-store';
import useSelector from '../../utils/use-selector';
import './styles.css';

function NotFound() {
  const store = useStore();

  const select = useSelector((state) => ({
    article: state.article,
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
    <Layout head={<h1>Магазин</h1>}>
      <BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
      <h2 className="NotFound-text">Страница не найдена</h2>
    </Layout>
  );
}

export default React.memo(NotFound);

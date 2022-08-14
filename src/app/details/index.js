import React, { useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useSelector from '../../utils/use-selector';
import useStore from '../../utils/use-store';
import ItemDetails from '../../components/item-details';
import Layout from '../../components/layout';
import BasketSimple from '../../components/basket-simple';

const Details = () => {
  const { _id } = useParams();
  const store = useStore();

  const select = useSelector((state) => ({
    item: state.details.item,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  useEffect(() => {
    store.get('details').fetchDetails(_id);
  }, [_id]);

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback((_id) => store.get('basket').addToBasket(_id), []),
  };

  return (
    <Layout head={<h1>{select.item.result?.title}</h1>}>
      <BasketSimple
        onOpen={callbacks.openModalBasket}
        amount={select.amount}
        sum={select.sum}
      />
      <ItemDetails item={select.item} onAdd={callbacks.addToBasket} />
    </Layout>
  );
};

export default React.memo(Details);
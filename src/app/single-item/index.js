import React, { useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useStore from '../../utils/use-store';
import useSelector from '../../utils/use-selector';
import BasketSimple from '../../components/basket-simple';
import Layout from '../../components/layout';
import SingleItemWrapper from '../../components/single-item-wrapper';
import ItemPage from '../../components/item-page/index';

function SingleItemPage() {
  console.log('single item');

  const store = useStore();
  const { id } = useParams();

  useEffect(() => {
    store.get('product').load(id);
  }, [id]);

  const select = useSelector((state) => ({
    product: state.product,
    items: state.catalog.items,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback((_id) => store.get('basket').addToBasket(_id), []),
  };

  const renders = {
    item: useCallback((item) => <ItemPage item={item} onAdd={callbacks.addToBasket} />, []),
  };

  return (
    <Layout head={<h1>{select.product.product.title}</h1>}>
      <BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
      <SingleItemWrapper item={select.product} renderItem={renders.item} />
    </Layout>
  );
}

export default React.memo(SingleItemPage);

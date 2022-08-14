import React, { useCallback } from 'react';
import BasketSimple from '../../components/basket-simple';
import Layout from '../../components/layout';
import useStore from '../../utils/use-store';
import useSelector from '../../utils/use-selector';
import { useParams } from 'react-router-dom';
import AboutItem from '../../components/aboutItem';

function ItemInfo() {
  const store = useStore();
  let params = useParams();
  React.useEffect(() => {
    store.get('description').loadItem(params.id);
  }, []);

  const select = useSelector((state) => ({
    item: state.description.item,
    amount: state.basket.amount,
    sum: state.basket.sum,
    title: state.description.title,
  }));

  const itemSelect = useSelector((state) => ({
    description: state.description.description,
    price: state.description.price,
    madeInTitle: state.description.madeInTitle,
    madeInCode: state.description.madeInCode,
    category: state.description.category,
    edition: state.description.edition,
  }));

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback((_id) => store.get('basket').addToBasket(_id), []),
  };
  return (
    <Layout head={<h1>{select.title}</h1>}>
      <BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
      <AboutItem select={itemSelect} add={callbacks.addToBasket} id={params.id} />
    </Layout>
  );
}

export default React.memo(ItemInfo);

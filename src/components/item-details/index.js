import React, {useCallback, useEffect} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import {useParams} from 'react-router-dom';
import './style.css';
import useSelector from '../../utils/use-selector';
import ItemCard from '../item-card';
import Layout from '../layout';
import BasketSimple from '../basket-simple';
import useStore from '../../utils/use-store';

function ItemDetails(props) {
  const cn = bem('ItemDetails');

  const params = useParams();
  const store = useStore();

  useEffect(() => {
    store.get('itemDetails').loadItem(params.itemId);
  }, [params.itemId]);

  const select = useSelector(state => ({
    sum: state.basket.sum
  }));

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
    // Добавление в корзину
    addToBasket: useCallback(_id => store.get('basket').addToBasket(_id), [])
  };

  return (
    <div className={cn()}>
      <Layout head={<h1>Название товара</h1>}>
        <BasketSimple
          onOpen={callbacks.openModalBasket}
          amount={select.amount}
          sum={select.sum}
        />
        <ItemCard />
      </Layout>
    </div>
  );
}

ItemDetails.propTypes = {};

export default React.memo(ItemDetails);

import React, { useCallback } from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import useStore from '../../utils/use-store';
import useSelector from '../../utils/use-selector';
import BasketSimple from '../../components/basket-simple';
import './style.css';

function Controls() {
  const store = useStore();

  const select = useSelector((state) => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const callbacks = {
    openModalBasket: useCallback(() => store.get('modals').open('basket'), []),
  };
  return (
    <div className='Controls'>
      <Link className='Controls-link' to={'/'}>
        Главная
      </Link>
      <BasketSimple onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
    </div>
  );
}

export default React.memo(Controls);

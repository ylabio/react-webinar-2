import React, { useCallback } from 'react';
import propTypes from 'prop-types';

import BasketSimple from '../../components/basket-simple';
import './style.css';
import Navbar from '../navbar';

function Controls({ amount, sum, openModalBasket }) {
  const callbacks = {
    openModalBasket: useCallback(() => openModalBasket(), []),
  };

  return (
    <div className='Controls'>
      <Navbar />
      <BasketSimple onOpen={callbacks.openModalBasket} amount={amount} sum={sum} />
    </div>
  );
}

Controls.propTypes = {
  amount: propTypes.number.isRequired,
  sum: propTypes.number.isRequired,
  openModalBasket: propTypes.func.isRequired,
};

export default React.memo(Controls);

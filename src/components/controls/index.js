import BasketSimple from "basket-simple";
import Menu from "menu";
import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import './style.css';

function Controls({sum, amount, onOpen}) {

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => onOpen(), []),
  };

  return (
    <div className='Controls'>
      <Menu/>
      <BasketSimple onOpen={callbacks.openModalBasket} amount={amount} sum={sum}/>
    </div>
  )
}

Controls.propTypes = {
  onOpen: propTypes.func.isRequired,
  sum: propTypes.number,
  amount: propTypes.number
}

Controls.defaultProps = {
  onOpen: () => {
  },
  sum: 0,
  amount: 0
}

export default React.memo(Controls);

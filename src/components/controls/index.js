import BasketSimple from "basket-simple";
import Menu from "menu";
import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import './style.css';

function Controls({sum, amount, onOpen, translation}) {

  const callbacks = {
    // Открытие корзины
    openModalBasket: useCallback(() => onOpen(), []),
  };

  return (
    <div className='Controls'>
      <Menu/>
      <BasketSimple onOpen={callbacks.openModalBasket} amount={amount} sum={sum} translation={callbacks.translation}/>
    </div>
  )
}

Controls.propTypes = {
  onOpen: propTypes.func.isRequired,
  sum: propTypes.number,
  amount: propTypes.number,
  translation: propTypes.func,
}

Controls.defaultProps = {
  onOpen: () => {
  },
  sum: 0,
  amount: 0
}

export default React.memo(Controls);

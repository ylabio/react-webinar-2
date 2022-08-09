import React from 'react';
import './style.css';
const plural = require('plural-ru');
import propTypes, { object } from 'prop-types';

function Controls({ cutting, cart, price, cartToggle }) {
  return (
    <div className='Controls'>
      <div className='cartInfo'>
        В корзине:
        <span className='itemsAndPrice'>
          {cart.length > 0
            ? `${plural(cart.length, '%d товар', '%d товара', '%d товаров')} / ${cutting(price)} ₽`
            : 'пусто'}
        </span>
      </div>
      <button onClick={() => cartToggle()}>Перейти</button>
    </div>
  );
}

Controls.propTypes = {
  cutting: propTypes.func.isRequired,
  cartToggle: propTypes.func.isRequired,
  cart: propTypes.arrayOf(object).isRequired,
  price: propTypes.number.isRequired,
};

Controls.defaultProps = {
  cutting: () => {},
  cartToggle: () => {},
  cart: [],
  price: null,
};

export default React.memo(Controls);

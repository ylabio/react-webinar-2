import React from 'react';
import './style.css';
const plural = require('plural-ru');

function Controls({ cart, price, amount, cartToggle }) {
  return (
    <div className='Controls'>
      <div className='cartInfo'>
        В корзине:
        <span className='itemsAndPrice'>
          {cart.length > 0
            ? `${plural(amount, '%d товар', '%d товара', '%d товаров')} / ${price} ₽`
            : 'пусто'}
        </span>
      </div>
      <button onClick={() => cartToggle()}>Перейти</button>
    </div>
  );
}

export default React.memo(Controls);

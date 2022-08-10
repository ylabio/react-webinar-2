import React from 'react';
import propTypes from 'prop-types';
import './style.css';
import plural from "plural-ru";

function Cart({totalPrice, openCart, uniqueItems}) {
  return (
    <div className='cart'>
      <div>В корзине:</div>
      <div className='price'> {
        uniqueItems !== 0 ?
          `${uniqueItems} ${plural(uniqueItems, 'товар', 'товарa', 'товаров')} / ${totalPrice} ₽`
          : 'пусто'}
      </div>
      <button onClick={() => openCart(true)}>Перейти</button>
    </div>
  )
}

Cart.propTypes = {
  totalPrice: propTypes.number.isRequired,
  openCart: propTypes.func.isRequired,
  uniqueItems: propTypes.number.isRequired
}

Cart.defaultProps = {}

export default React.memo(Cart);

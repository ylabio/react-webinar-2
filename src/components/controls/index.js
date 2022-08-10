import React from 'react';
import propTypes from 'prop-types';
import plural from 'plural-ru';
import {getTotalPrice} from '../../utils.js';
import './style.css';

function Controls({onOpenCart, cartItemsAmount, cartTotalPrice}){
  const cartInfo = cartTotalPrice || cartItemsAmount
    ? `${cartItemsAmount} ${plural(cartItemsAmount, 'товар', 'товара', 'товаров')} / ${cartTotalPrice.toLocaleString('ru-RU')} ₽`
    : 'пусто';

  return (
    <div className='Controls'>
      <div className='Controls-title'>В корзине: </div>
      <div className='Controls-info'>{cartInfo}</div>
      <button className='Controls-btn' onClick={onOpenCart}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  onOpenCart: propTypes.func.isRequired, // Обязательное свойство - функция
  cartItemsAmount: propTypes.number,
  cartTotalPrice: propTypes.number,
}

Controls.defaultProps = {
  cartItemsAmount: 0,
  cartTotalPrice: 0,
}

export default React.memo(Controls);

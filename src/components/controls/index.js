import React from 'react';
import propTypes from 'prop-types';
import plural from 'plural-ru';
import {getTotalPrice} from '../../utils.js';
import './style.css';

function Controls({onOpenCart, cartItems}){
  const cartTotalPrice = getTotalPrice(cartItems);
  const cartAmountItems = cartItems.length;
  const cartInfo = cartTotalPrice || cartAmountItems
    ? `${cartAmountItems} ${plural(cartAmountItems, 'товар', 'товара', 'товаров')} / ${cartTotalPrice.toLocaleString('ru-RU')} ₽`
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
  onOpenCart: propTypes.func.isRequired // Обяхательное свойство - функция
}

Controls.defaultProps = {
  onOpenCart: () => {} // Значение по умолчанию - функция-заглушка
}

export default React.memo(Controls);

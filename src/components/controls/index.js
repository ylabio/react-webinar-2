import React from 'react';
import {cn as bem} from "@bem-react/classname";
import plural from 'plural-ru';
import propTypes, { number } from 'prop-types';
import './style.css';

function Controls({openCart, cartItems}){
  const cn = bem('Controls')

  const cartInfo = () => {
    const cartLength = cartItems.length;
    if(cartLength > 0) {
      const cartTotal = cartItems.reduce((prev, next) => prev + next.price * next.count, 0)
      return `${cartLength} ${plural(cartLength, "товар", "товара", "товаров")} / ${cartTotal} \u20BD`
    }
    return `пусто`
  }
  
  return (
    <div className={cn()}>
      <p className={cn('cart-info')}>В корзине: <b>{cartInfo()}</b></p>
      <button onClick={openCart}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  openCart: propTypes.func.isRequired, // Обязательное свойство - функция
  cartItems: propTypes.array.isRequired
}

Controls.defaultProps = {
  openCart: () => {}, // Значение по умолчанию - функция-заглушка
  cartItems: []
}

export default React.memo(Controls);

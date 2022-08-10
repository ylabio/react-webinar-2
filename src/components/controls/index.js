import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import plural from 'plural-ru';
import './style.css';

function Controls({onShowCart, quantityUnicItemsCart, sumPricesInCart}){
  const cn = bem('Controls');

  return (
    <div className={cn()}>
      <div className={cn('cart')}>
        <div>В корзине:</div>
        <div className={cn('sum')}>{quantityUnicItemsCart ? `${quantityUnicItemsCart} ${plural(quantityUnicItemsCart, 'товар', 'товара', 'товаров')} / ${sumPricesInCart.toLocaleString()} ₽` : 'пусто'}</div>
      </div>
      <button onClick={onShowCart}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  onShowCart: propTypes.func.isRequired, // Обяхательное свойство - функция
  quantityUnicItemsCart: propTypes.number.isRequired,
  sumPricesInCart: propTypes.number.isRequired
}

Controls.defaultProps = {
  quantityUnicItemsCart: 0,
  sumPricesInCart: 0,
  onShowCart: () => {} // Значение по умолчанию - функция-заглушка
}

export default React.memo(Controls);

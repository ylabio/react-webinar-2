import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import plural from 'plural-ru';
import './style.css';

function Controls({onShowCart, itemsCart, sumPrices}){
  const cn = bem('Controls');

  return (
    <div className={cn()}>
      <div className={cn('cart')}>
        <div>В корзине:</div>
        <div className={cn('sum')}>{itemsCart.length ? `${itemsCart.length} ${plural(itemsCart.length, 'товар', 'товара', 'товаров')} / ${sumPrices.toLocaleString()} ₽` : 'пусто'}</div>
      </div>
      <button onClick={onShowCart}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  onShowCart: propTypes.func.isRequired, // Обяхательное свойство - функция
  itemsCart: propTypes.arrayOf(propTypes.object).isRequired,
  sumPrices: propTypes.number.isRequired
}

Controls.defaultProps = {
  itemsCart: [],
  sumPrices: 0,
  onShowCart: () => {} // Значение по умолчанию - функция-заглушка
}

export default React.memo(Controls);

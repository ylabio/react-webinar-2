import React from 'react';
import propTypes from 'prop-types';
import './style.css';
import {pluralize} from '../../utils';
import {cn as bem} from "@bem-react/classname";

function Controls({cart, onAdd}){
  const cn = bem('Controls');
  return (
    <div className={cn()}>
      <div className={cn('title')}>
        В корзине:
      </div>
      <div className={cn('cart')}>
        {cart.length 
        + pluralize(cart.length, [' товар', ' товара', ' товаров'])
        + ` / ${cart.map(el => el.price).reduce((a,b)=>a+b,0).toLocaleString('ru-RU') + " \u20bd"}` }
      </div>
      <div className={cn('actions')}>
        <button onClick={onAdd}>Добавить</button>
      </div>
    </div>
  )
}

Controls.propTypes = {
  cart: propTypes.array.isRequired,
  onAdd: propTypes.func.isRequired // Обяхательное свойство - функция
}

Controls.defaultProps = {
  cart: [],
  onAdd: () => {} // Значение по умолчанию - функция-заглушка
}

export default React.memo(Controls);

import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import plural from 'plural-ru';
import './style.css';
import {calculateTotalPrice} from '../../utils';

function Controls({onAdd, cartItems}){
  const cn = bem('Controls');

  return (
    <div className={cn()}>
			<div className={cn('total')}>В корзине:<strong>{cartItems.length ? `${cartItems.length} ${plural(cartItems.length, 'товар', 'товара', 'товаров')} / ${calculateTotalPrice(cartItems)} ₽` : 'пусто'}</strong></div>
      <button onClick={onAdd}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  onAdd: propTypes.func.isRequired, // Обяхательное свойство - функция
	cartItems: propTypes.arrayOf(propTypes.object).isRequired
}

Controls.defaultProps = {
  onAdd: () => {}, // Значение по умолчанию - функция-заглушка
	cartItems: []
}

export default React.memo(Controls);

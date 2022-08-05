import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import plural from 'plural-ru';
import './style.css';

function Controls({onAdd, cart, items}){
  const cn = bem('Controls');

  const countOfItems = Object.keys(cart).length;

  let totalPrice = 0;
  
  if (countOfItems) {
    for (let prop in cart) {
      totalPrice += items.find(el => el.code === +prop).price*cart[prop]
    }
  }

  return (
    <div className={cn()}>

      <span className={cn('text')}>В корзине:</span>
      <span className={cn('data')}>
        { countOfItems 
          ? `${countOfItems}
             ${plural(countOfItems, 'товар', 'товара', 'товаров')} / 
             ${totalPrice.toLocaleString('ru')} ₽` 
          : "пусто" }
        </span>
      <button className={cn('button')} onClick={onAdd}>
        Перейти
      </button>
    
    </div>
  )
}

Controls.propTypes = {
  onAdd: propTypes.func.isRequired, // Обяхательное свойство - функция
  cart: propTypes.object,
  items: propTypes.arrayOf(propTypes.object).isRequired,
}

Controls.defaultProps = {
  onAdd: () => {}, // Значение по умолчанию - функция-заглушка
  cart: {},
  items: [],
}

export default React.memo(Controls);

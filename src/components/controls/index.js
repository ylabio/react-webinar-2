import React from 'react';
import propTypes from 'prop-types';
import './style.css';
import {cn as bem} from "@bem-react/classname";

function Controls({getCartCount, getCartSum, onOpen}){
  const cn = bem('Controls');
  const plural = require('plural-ru');
  return (
    <div className={cn()}>
      <div className={cn('stats')}>
        В корзине: <strong>{getCartCount() ? 
                  `${getCartCount()} ${plural(getCartCount(), 'товар', 'товара', 'товаров')} / ${getCartSum().toLocaleString()} ₽` : 
                  `пусто`}</strong>
      </div>
      <button onClick={onOpen}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  onOpen: propTypes.func.isRequired, // Обяхательное свойство - функция
  getCartCount:  propTypes.func.isRequired,
  getCartSum:  propTypes.func.isRequired
}

Controls.defaultProps = {
  onOpen: () => {}, // Значение по умолчанию - функция-заглушка
  getCartCount: () => {},
  getCartSum: () => {}
}

export default React.memo(Controls);

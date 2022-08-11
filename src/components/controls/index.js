import React from 'react';
import propTypes from 'prop-types';
import './style.css';
import {pluralize} from '../../utils';
import {cn as bem} from "@bem-react/classname";

function Controls({onOpen, cartQty, cartTotal}){
  const cn = bem('Controls');

  return (
    <div className={cn()}>
      <div className={cn('title')}>
          В корзине:
      </div>
      <div className={cn('cart')}>
        {(cartQty > 0) ? cartQty 
            + pluralize(cartQty, [' товар', ' товара', ' товаров'])
            + ` / ${cartTotal.toLocaleString('ru-RU') + ' \u20bd'}`
            : 'пусто'
        }
      </div>
      <div className={cn('actions')}>
        <button className={cn('button')} onClick={onOpen}>Перейти</button>
      </div>
    </div>
  )
}

Controls.propTypes = {
  onOpen: propTypes.func.isRequired, // Обяхательное свойство - функция
  cartQty: propTypes.number,
  cartTotal: propTypes.number,
}

export default React.memo(Controls);

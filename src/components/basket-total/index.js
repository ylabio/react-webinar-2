import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function BasketTotal({totalPrice, numUniqueItems}) {
  const cn = bem('BasketTotal');
  
  return (
    <div className={cn()}> 
      {
        numUniqueItems ?
          <>
            <div className={cn('total')}>
              <strong>Итого</strong>
            </div>
            <div className={cn('price')}>
              <strong>{totalPrice.toLocaleString('ru')} ₽</strong>
            </div>
          </>
        :
          <strong>В корзине пусто</strong>
      }
    </div>
  )
}

BasketTotal.propTypes = {
  totalPrice: propTypes.number.isRequired,
  numUniqueItems: propTypes.number.isRequired
}

export default React.memo(BasketTotal);

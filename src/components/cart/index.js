import React from 'react';
import propTypes, { exact } from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import plural from 'plural-ru';
import './style.css';

function Cart({count, totalPrice}){
  const cn = bem('Cart');

  return (
    <div className={cn()}>
      <span>В корзине:</span>
    
      <span className={cn('subtitle')}>
        {
          count 
          ? 
          `${count} ${plural(count, 'товар', 'товара', 'товаров')} / ${totalPrice}`
          :
          'пусто'
        }
      </span>
    </div>
  )
}

Cart.propTypes = {
  count: propTypes.number.isRequired,
  totalPrice: propTypes.string.isRequired,
}

export default React.memo(Cart);

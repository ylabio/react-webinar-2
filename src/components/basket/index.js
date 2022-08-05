import React from 'react';
import propTypes, { exact } from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import plural from 'plural-ru';
import './style.css';

function Basket({count, sumPrice}){
  const cn = bem('Basket');

  return (
    <div className={cn()}>
      <span>В корзине:</span>
      <span className={cn('subtitle')}>
        {
          count ? 
          `${count} ${plural(count, 'товар', 'товара', 'товаров')} / ${sumPrice}`
          :
          'пусто'
        }
      </span>
    </div>
  )
}

Basket.propTypes = {
  count: propTypes.number.isRequired,
  sumPrice: propTypes.string.isRequired,
}

export default React.memo(Basket);

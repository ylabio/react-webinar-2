import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function Basket({children, basketCount, totalSum}) {
  const cn = bem('Basket');
  /* Изменил корзину согласно замечаниям, теперь она содержит
     список товаров и блок "итого", либо сообщение об 
     отсутствии товаров 
  */
  return (
    <div className={cn()}>
      {basketCount ?
        <>
          {children}
          <div className={cn('summary')}>
            <span>Итого</span>
            <span>{totalSum.toLocaleString('ru-RU')} &#8381;</span>
          </div>
        </> :
        <div className={cn('empty')}>Нет товаров</div>
      } 
    </div>
  )
}

Basket.propTypes = {
  children: propTypes.node.isRequired,
  basketCount: propTypes.number.isRequired,
  totalSum: propTypes.number.isRequired
}

export default Basket;
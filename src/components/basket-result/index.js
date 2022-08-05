import React from 'react';
import propTypes from 'prop-types';
import './style.css';
import { formatNumber } from '../../utils';
import {cn as bem} from "@bem-react/classname";

function BasketResult(props) {
  const cn = bem('Basket');

  return (
    <>
      {props.count ?
      <div className={cn('footer')}>
          <span className={cn('total')}>Итого</span>
          <span className={cn('price')}>{formatNumber(props.totalSum)} ₽</span>
      </div> : <h3 className={cn('title')}>Корзина пуста</h3>} 
    </> 
  )
}

BasketResult.propTypes = {
  totalSum: propTypes.number.isRequired
}

export default React.memo(BasketResult);
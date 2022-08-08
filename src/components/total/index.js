import React from 'react';
import propTypes from 'prop-types';
import { prettify } from './../../utils';
import './style.css';

function Total({ totalPrice }) {
  console.log(totalPrice);

  return (
    <div className='total'>
      {totalPrice === 0 ?
        <div className='total-text'>Корзина пуста</div>
        : <>
          <span>Итого</span>
          <span className='total-number'>{prettify(totalPrice)} ₽</span>
        </>}
    </div>
  )
}

Total.propTypes = {
  totalPrice: propTypes.number
}

Total.defaultProps = {
  totalPrice: 0
}

export default React.memo(Total);
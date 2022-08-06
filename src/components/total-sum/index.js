import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function TotalSum({ basket }) {
  const cn = bem('TotalSum');

  const price = basket.reduce((sum, product) => sum + product.price * product.count, 0);

  return (
    <div className={cn()}>
      <p className={cn('total')}>Итого</p>
      <p className={cn('sum')}>{price.toLocaleString('ru-RU', { 
        style: 'currency', 
        currency: 'RUB', 
        minimumFractionDigits: 0 
      })}</p>
    </div>
  )
}

TotalSum.propTypes = {
  basket: propTypes.arrayOf(propTypes.object).isRequired,
}

TotalSum.defaultProps = {
  basket: [],
}

export default React.memo(TotalSum);

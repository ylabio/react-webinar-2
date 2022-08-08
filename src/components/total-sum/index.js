import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import {currency} from '../../utils.js';
import './style.css';

function TotalSum({ basket }) {
  const cn = bem('TotalSum');

  const price = basket.reduce((sum, product) => sum + product.price * product.count, 0);

  return (
    <div className={cn()}>
      <p className={cn('total')}>Итого</p>
      <p className={cn('sum')}>{currency(price)}</p>
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

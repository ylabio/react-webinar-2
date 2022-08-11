import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import {currency} from '../../utils.js';
import './style.css';

function TotalSum({ amountProducts }) {
  const cn = bem('TotalSum');

  return (
    <div className={cn()}>
      <p className={cn('total')}>Итого</p>
      <p className={cn('sum')}>{currency(amountProducts.amount)}</p>
    </div>
  )
}

TotalSum.propTypes = {
  amountProducts: propTypes.object.isRequired,
}

TotalSum.defaultProps = {
  amountProducts: {},
}

export default React.memo(TotalSum);

import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import {getPriceOnRub} from '../../utils';
import './style.css';

function Total({totalPrice}) {
  const cn = bem('Total');
  return (
    <div className={cn()}>
      <h2 className={cn('text')}>Итого</h2>
      <p className={cn('price')}>{getPriceOnRub(totalPrice)}</p>
    </div>
  )
}

Total.propTypes = {
  totalPrice: propTypes.number.isRequired,
}

export default React.memo(Total);

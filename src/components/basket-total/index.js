import propTypes from 'prop-types';
import React from 'react';
import numberFormat from '../../utils/number-format';
import './styles.css';

function BasketTotal(props) {
  return (
    <div className='BasketTotal'>
      <span className='BasketTotal-cell'>{props.totalLabel}</span>
      <span className='BasketTotal-cell'> {numberFormat(props.sum)} ₽</span>
      <span className='BasketTotal-cell'></span>
    </div>
  );
}

BasketTotal.propTypes = {
  sum: propTypes.number,
  totalLabel: propTypes.string
};

BasketTotal.defaultProps = {
  sum: 0
};

export default React.memo(BasketTotal);

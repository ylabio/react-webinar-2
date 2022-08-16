import React from 'react';
import propTypes from 'prop-types';
import numberFormat from '../../utils/number-format';
import './styles.css';

function BasketTotal(props) {
  return (
    <div className='BasketTotal'>
      <span className='BasketTotal-cell'>{props.content.total}</span>
      <span className='BasketTotal-cell'> {numberFormat(props.sum)} ₽</span>
      <span className='BasketTotal-cell'></span>
    </div>
  );
}

BasketTotal.propTypes = {
  content: propTypes.object.isRequired,
  sum: propTypes.number,
};

BasketTotal.defaultProps = {
  sum: 0,
};

export default React.memo(BasketTotal);

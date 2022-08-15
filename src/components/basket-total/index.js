import React from 'react';
import propTypes from 'prop-types';
import numberFormat from "../../utils/number-format";
import './style.css';

function BasketTotal({sum}) {
  return (
    <div className="BasketTotal">
      <span className="BasketTotal-cell">Итого</span>
      <span className="BasketTotal-cell"> {numberFormat(sum)} ₽</span>
      <span className="BasketTotal-cell"></span>
    </div>
  )
}

BasketTotal.propTypes = {
  sum: propTypes.number
}

BasketTotal.defaultProps = {
  sum: 0
}

export default React.memo(BasketTotal);

import React from 'react';
import propTypes from 'prop-types';
import numberFormat from "../../utils/numberFormat";
import './styles.css';

function BasketTotal({sum, ln = {}}) {
  return (
    <div className="BasketTotal">
      <span className="BasketTotal-cell">{ln.total}</span>
      <span className="BasketTotal-cell"> {numberFormat(sum)} ₽</span>
      <span className="BasketTotal-cell"></span>
    </div>
  )
}

BasketTotal.propTypes = {
  sum: propTypes.number,
  ln: propTypes.objectOf(propTypes.string).isRequired,
}

BasketTotal.defaultProps = {
  sum: 0
}

export default React.memo(BasketTotal);

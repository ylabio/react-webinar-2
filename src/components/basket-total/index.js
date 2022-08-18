import React from 'react';
import propTypes from 'prop-types';
import numberFormat from "../../utils/number-format";
import './style.css';

function BasketTotal(props) {
  return (
    <div className="BasketTotal">
      <span className="BasketTotal-cell">{props.translation('total')}</span>
      <span className="BasketTotal-cell"> {numberFormat(props.sum)} ₽</span>
      <span className="BasketTotal-cell"></span>
    </div>
  )
}

BasketTotal.propTypes = {
  sum: propTypes.number,
  translation: propTypes.func,
}

BasketTotal.defaultProps = {
  sum: 0,
  translation: () => {},
}

export default React.memo(BasketTotal);

import React from 'react';
import propTypes from 'prop-types';
import numberFormat from "../../utils/number-format";
import './styles.css';

function BasketTotal(props) {
  return (
    <div className="BasketTotal">
      <span className="BasketTotal-cell">{props.t('basket.total')}</span>
      <span className="BasketTotal-cell"> {numberFormat(props.sum)} ₽</span>
      <span className="BasketTotal-cell"></span>
    </div>
  )
}

BasketTotal.propTypes = {
  sum: propTypes.number,
  t: propTypes.func
}

BasketTotal.defaultProps = {
  sum: 0,
  t: (text) => text
}

export default React.memo(BasketTotal);

import React from 'react';
import propTypes from 'prop-types';
import numberFormat from "../../utils/number-format";
import './styles.css';

function BasketTotal({sum, text}) {
  return (
    <div className="BasketTotal">
      <span className="BasketTotal-cell">
        {text.total}
      </span>
      <span className="BasketTotal-cell">{numberFormat(sum)} ₽</span>
      <span className="BasketTotal-cell"></span>
    </div>
  )
}

BasketTotal.propTypes = {
  sum: propTypes.number,
  text: propTypes.object,
}

BasketTotal.defaultProps = {
  sum: 0,
  text: {},
}

export default React.memo(BasketTotal);

import React from 'react';
import propTypes from 'prop-types';
import numberFormat from "../../utils/number-format";
import './styles.css';

function BasketTotal(props) {
  return (
    <div className="BasketTotal">
      <span className="BasketTotal-cell">{props.translate(props.language, 'Total')}</span>
      <span className="BasketTotal-cell"> {numberFormat(props.sum)} ₽</span>
      <span className="BasketTotal-cell"></span>
    </div>
  )
}

BasketTotal.propTypes = {
  language: propTypes.string,
  translate: propTypes.func,
  sum: propTypes.number
}

BasketTotal.defaultProps = {
  language: 'RU',
  translate: (langugage, key) => key,
  sum: 0
}

export default React.memo(BasketTotal);

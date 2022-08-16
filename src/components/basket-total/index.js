import React from 'react';
import propTypes from 'prop-types';
import numberFormat from '../../utils/number-format';
import localization from './localization';
import './styles.css';

function BasketTotal(props) {
  return (
    <div className="BasketTotal">
      <span className="BasketTotal-cell">{localization[props.lang].total}</span>
      <span className="BasketTotal-cell"> {numberFormat(props.sum)} ₽</span>
      <span className="BasketTotal-cell"></span>
    </div>
  )
}

BasketTotal.propTypes = {
  sum: propTypes.number,
  lang: propTypes.string
}

BasketTotal.defaultProps = {
  sum: 0,
  lang: "RU"
}

export default React.memo(BasketTotal);

import React from 'react';
import propTypes from 'prop-types';
import numberFormat from "../../utils/number-format";
import './styles.css';
import { localize } from '../../utils/localize';

function BasketTotal({ sum, language }) {
  return (
    <div className="BasketTotal">
      <span className="BasketTotal-cell">{localize['Итого'][language]}</span>
      <span className="BasketTotal-cell"> {numberFormat(sum)} ₽</span>
      <span className="BasketTotal-cell"></span>
    </div>
  )
}

BasketTotal.propTypes = {
  sum: propTypes.number,
  language: propTypes.string.isRequired,
}

BasketTotal.defaultProps = {
  sum: 0
}

export default React.memo(BasketTotal);

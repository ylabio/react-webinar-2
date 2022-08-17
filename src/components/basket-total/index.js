import React from 'react';
import propTypes from 'prop-types';
import numberFormat from "../../utils/numberFormat";
import './styles.css';



function BasketTotal(props) {
  return (
    <div className="BasketTotal">
      <span className="BasketTotal-cell">{props.translate(props.language, props.codesBasketTotal.CODE_15) || 'Итого'}</span>
      <span className="BasketTotal-cell"> {numberFormat(props.sum)} ₽</span>
      <span className="BasketTotal-cell"></span>
    </div>
  )
}

BasketTotal.propTypes = {
  codesBasketTotal: propTypes.object.isRequired,
  translate: propTypes.func.isRequired,
  sum: propTypes.number.isRequired,
  language: propTypes.string.isRequired,
}

BasketTotal.defaultProps = {
  codesBasketTotal: {},
  translate: () => {},
  sum: 0,
}

export default React.memo(BasketTotal);

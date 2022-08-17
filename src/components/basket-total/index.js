import React from 'react';
import propTypes from 'prop-types';
import numberFormat from "../../utils/numberFormat";
import './styles.css';

function BasketTotal(props) {
  return (
    <div className="BasketTotal">
      <span className="BasketTotal-cell">{props.translate("total")}</span>
      <span className="BasketTotal-cell"> {numberFormat(props.sum)} ₽</span>
      <span className="BasketTotal-cell"></span>
    </div>
  )
}

BasketTotal.propTypes = {
  sum: propTypes.number,
  translate: propTypes.func
}

BasketTotal.defaultProps = {
  sum: 0,
  translate: () => {}
}

export default React.memo(BasketTotal);

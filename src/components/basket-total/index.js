import React from 'react';
import propTypes from 'prop-types';
import numberFormat from "../../utils/number-format";
import './style.css';
import useTranslation from '../../utils/use-translation';

function BasketTotal(props) {
  const translation = useTranslation();
  return (
    <div className="BasketTotal">
      <span className="BasketTotal-cell">{translation.basket.total}</span>
      <span className="BasketTotal-cell"> {numberFormat(props.sum)} ₽</span>
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

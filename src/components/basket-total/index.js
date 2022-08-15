import React from 'react';
import propTypes from 'prop-types';
import numberFormat from "utils/number-format";
import './styles.css';
import useLanguage from "utils/use-language";

function BasketTotal(props) {
  const translation = useLanguage()

  return (
    <div className="BasketTotal">
      <span className="BasketTotal-cell">{translation('total')}</span>
      <span className="BasketTotal-cell"> {numberFormat(props.sum)} ₽</span>
      <span className="BasketTotal-cell"/>
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

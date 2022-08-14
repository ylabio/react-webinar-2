import React from 'react';
import propTypes from 'prop-types';
import numberFormat from "../../utils/numberFormat";
import titleLang from "../../utils/titleLang";
import './styles.css';

function BasketTotal(props) {
  return (
    <div className="BasketTotal">
      <span className="BasketTotal-cell">{titleLang(props.lang, 'total')}</span>
      <span className="BasketTotal-cell"> {numberFormat(props.sum)} ₽</span>
      <span className="BasketTotal-cell"></span>
    </div>
  )
}

BasketTotal.propTypes = {
  lang: propTypes.string.isRequired,
  sum: propTypes.number
}

BasketTotal.defaultProps = {
  sum: 0
}

export default React.memo(BasketTotal);

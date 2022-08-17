import React from 'react';
import propTypes from 'prop-types';
import numberFormat from "../../utils/number-format";
import './styles.css';
import translate from '../../utils/translate';

function BasketTotal(props) {
  return (
    <div className="BasketTotal">
      <span className="BasketTotal-cell">{translate(props.lang, 'Итого')}</span>
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
  lang: 'ru'
}

export default React.memo(BasketTotal);

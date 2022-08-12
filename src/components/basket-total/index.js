import React from 'react';
import propTypes from 'prop-types';
import numberFormat from "../../utils/numberFormat";
import './styles.css';
import Translate from '../../app/translate';

function BasketTotal(props) {
  return (
    <div className="BasketTotal">
      <span className="BasketTotal-cell">
        <Translate text='Итого' />
      </span>
      <span className="BasketTotal-cell">
        {props.sum.toLocaleString(props.lang === 'ru' ? 'ru' : 'en')} ₽
        </span>
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

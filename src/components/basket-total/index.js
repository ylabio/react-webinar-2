import React from 'react';
import propTypes from 'prop-types';
import numberFormat from "../../utils/numberFormat";
import { translate } from '../../utils/languages';
import './styles.css';

function BasketTotal(props) {
  return (
    <div className="BasketTotal">
      <span className="BasketTotal-cell">{translate('basketTotal')}</span>
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

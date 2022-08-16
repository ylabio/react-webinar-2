import React from 'react';
import propTypes from 'prop-types';
import numberFormat from "../../utils/number-format";
import {cn as bem} from "@bem-react/classname";
import './style.css';

function BasketTotal(props) {
  const cn = bem('BasketTotal');

  return (
    <div className={cn()}>
      <span className={cn('cell')}>{props.totalText}</span>
      <span className={cn('cell')}> {numberFormat(props.sum)} ₽</span>
      <span className={cn('cell')}></span>
    </div>
  )
}

BasketTotal.propTypes = {
  sum: propTypes.number,
  totalText: propTypes.string
}

BasketTotal.defaultProps = {
  sum: 0,
  totalText: 'Итого'
}

export default React.memo(BasketTotal);

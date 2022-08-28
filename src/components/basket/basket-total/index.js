import React from 'react';
import propTypes from 'prop-types';
import numberFormat from "../../../utils/number-format";
import './style.css';
import {cn as bem} from "@bem-react/classname";

function BasketTotal(props) {

  // CSS классы по БЭМ
  const cn = bem('BasketTotal');

  return (
    <div className={cn()}>
      <span className={cn('cell')}>{props.t('basket.total')}</span>
      <span className={cn('cell')}> {numberFormat(props.sum)} ₽</span>
      <span className={cn('cell')}></span>
    </div>
  )
}

BasketTotal.propTypes = {
  sum: propTypes.number,
  t: propTypes.func
}

BasketTotal.defaultProps = {
  sum: 0,
  t: (text) => text
}

export default React.memo(BasketTotal);

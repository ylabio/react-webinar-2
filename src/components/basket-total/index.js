import React from "react";
import propTypes from "prop-types";
import numberFormat from "../../utils/number-format";
import "./styles.css";
import {cn as bem} from "@bem-react/classname";

function BasketTotal(props) {
  const cn = bem('BasketTotal');

  return (
    <div className={cn()}>
      <span className={cn('cell')}>Итого</span>
      <span className={cn('cell')}> {numberFormat(props.sum)} ₽</span>
      <span className={cn('cell')}></span>
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

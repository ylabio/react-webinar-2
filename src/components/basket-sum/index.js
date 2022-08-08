import React from "react";
import {cn as bem} from "@bem-react/classname";
import propTypes from "prop-types";

import { formatNumber } from "../../utils";


import "./style.css";

function BasketSum({price}) {
  const cn = bem('BasketSum')
  return (
    <div className={cn()}>
      <span className={cn('title')}>Итого</span>
      <span>{formatNumber(price) + " ₽"}</span>
    </div>
  )
}

BasketSum.propTypes = {
  price: propTypes.number
}

export default React.memo(BasketSum);
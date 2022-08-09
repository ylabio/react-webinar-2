import React from 'react';
import './style.css';
import propTypes from "prop-types";
import {cn as bem} from "@bem-react/classname";
import {toRubPrice} from "../../../utils";

function CartTotalPrice({cartTotalPrice}) {
  const cn = bem('Cart-total-price');

  return (
    <div className={cn()}>
      <strong>
        <span>Итого</span>
        <span>{toRubPrice(cartTotalPrice)}</span>
      </strong>
    </div>
  )
}

CartTotalPrice.propTypes = {
  cartTotalPrice: propTypes.number
}

CartTotalPrice.defaultProps = {
  cartTotalPrice: 0
}

export default React.memo(CartTotalPrice);
import React from "react";
import propTypes from "prop-types";
import "./style.css";

function CartTotal({ cartTotalCost, currency }) {
  return (
    <div className={"Cart-total"}>
      <span>Итого</span>
      <span>{cartTotalCost.toLocaleString("ru-RU") + " " + currency}</span>
    </div>
  );
}

CartTotal.propTypes = {
  cartTotalCost: propTypes.number.isRequired,
  currency: propTypes.string.isRequired,
};

export default React.memo(CartTotal);

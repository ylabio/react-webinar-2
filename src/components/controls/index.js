import React from "react";
import propTypes from "prop-types";
import "./style.css";
import { textFormatter } from "../../utils";

function Controls({ totalPrice, showModal, cartLength }) {
  const text = textFormatter(cartLength, ["товар", "товара", "товаров"]);
  return (
    <div className="Controls">
      <div>В корзине:</div>
      <span style={{ fontWeight: "bold" }}>
        {cartLength
          ? `  ${cartLength} ${text} / ${totalPrice.toLocaleString()} ₽`
          : `пусто`}
      </span>
      <button onClick={() => showModal()}>Перейти</button>
    </div>
  );
}

Controls.propTypes = {
  showModal: propTypes.func.isRequired,
  cartLength: propTypes.number.isRequired,
  totalPrice: propTypes.number.isRequired,
};

export default React.memo(Controls);

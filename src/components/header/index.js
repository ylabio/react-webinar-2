import React from "react";
import propTypes from "prop-types";
import "./style.css";
import Button from "../button";
import { textFormatter } from "../../utils";

function Header({ totalPrice, showModal, ItemsQuantity, cartLength }) {
  const text = textFormatter(ItemsQuantity, ["товар", "товара", "товаров"]);

  return (
    <div className="Header">
      <div>В корзине:</div>
      <span style={{ fontWeight: "bold" }}>
        {cartLength ? `  ${ItemsQuantity} ${text} / ${totalPrice} ₽` : `пусто`}
      </span>
      <Button onClick={() => showModal()}>Перейти</Button>
    </div>
  );
}

Header.propTypes = {
  showModal: propTypes.func.isRequired,
  ItemsQuantity: propTypes.number.isRequired,
  cartLength: propTypes.number.isRequired,
  totalPrice: propTypes.number.isRequired,
};

export default React.memo(Header);

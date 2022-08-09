import React from "react";
import List from "../list";
import "./style.css";
import { cn as bem } from "@bem-react/classname";
import { get_cart_total_values } from "../../utils";
import Modal from "../modal";
import propTypes from "prop-types";

function Cart({ cart, buttonLabel, onButtonClick, onCloseCart }) {
  const { total_price, total_quantity } = get_cart_total_values(cart);

  const cn = bem("Cart");

  let content = (
    <div className={cn()}>
      <List
        items={cart}
        onButtonClick={onButtonClick}
        buttonLabel={buttonLabel}
      />
      <div className={cn("total")}>
        <span>Итого</span>
        <span>{`${total_price} ₽`}</span>
      </div>
    </div>
  );

  if (!total_quantity) {
    content = <h2 className={cn("empty")}>Пусто</h2>;
  }

  return <Modal onClose={onCloseCart}>{content}</Modal>;
}

Cart.propTypes = {
  cart: propTypes.arrayOf(propTypes.object).isRequired,
  buttonLabel: propTypes.string.isRequired,
  onButtonClick: propTypes.func.isRequired,
  onCloseCart: propTypes.func.isRequired,
};

export default React.memo(Cart);

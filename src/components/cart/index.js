import React from "react";
import List from "../list";
import "./style.css";
import { cn as bem } from "@bem-react/classname";

import Modal from "../modal";
import propTypes from "prop-types";

function Cart({
  cart,
  buttonLabel,
  onButtonClick,
  onCloseCart,
  total_price,
  total_quantity,
}) {
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
        <span>{`${total_price.toLocaleString("ru-RU")} ₽`}</span>
      </div>
    </div>
  );

  if (!total_quantity) {
    content = <h2 className={cn("empty")}>Пусто</h2>;
  }

  return (
    <Modal title={<h2>Корзина</h2>} onClose={onCloseCart}>
      {content}
    </Modal>
  );
}

Cart.propTypes = {
  cart: propTypes.arrayOf(propTypes.object).isRequired,
  buttonLabel: propTypes.string.isRequired,
  onButtonClick: propTypes.func.isRequired,
  onCloseCart: propTypes.func.isRequired,
  total_price: propTypes.number.isRequired,
  total_quantity: propTypes.number.isRequired,
};

export default React.memo(Cart);

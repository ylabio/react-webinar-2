import React, { useCallback } from "react";
import Layout from "../layout";
import List from "../list";
import "./style.css";
import { cn as bem } from "@bem-react/classname";
import Background from "../background";
import { get_cart_total_values } from "../../utils";
import Modal from "../modal";

function Cart(props) {
  const callbacks = {
    close: useCallback(() => {
      props.onCloseCart();
    }),
  };

  const { total_price, total_quantity } = get_cart_total_values(props.cart);

  const cn = bem("Cart");
  let content = (
    <div className={cn()}>
      <List
        items={props.cart}
        onButtonClick={props.onButtonClick}
        buttonLabel={props.buttonLabel}
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

  return <Modal onClose={callbacks.close}>{content}</Modal>;
}

export default Cart;

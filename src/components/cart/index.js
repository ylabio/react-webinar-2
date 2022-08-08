import React, { useCallback } from "react";
import Layout from "../layout";
import List from "../list";
import "./style.css";
import { cn as bem } from "@bem-react/classname";
import Background from "../background";
import { get_cart_total_values } from "../../utils";

function Cart(props) {
  const callbacks = {
    onClick: useCallback(() => {
      props.onCloseCart();
    }),
  };

  const { total_price, total_quantity } = get_cart_total_values(props.cart);

  const cn = bem("Cart");

  return (
    <>
      <div className={cn()}>
        <Layout head={<h1>Корзина</h1>}>
          <List items={props.cart} cart={true} />
          <div className={cn("total")}>
            <span>Итого</span>
            <span>{`${total_price} ₽`}</span>
          </div>
          <button className="close" onClick={callbacks.onClick}>
            Закрыть
          </button>
        </Layout>
      </div>
      <Background />
    </>
  );
}

export default Cart;

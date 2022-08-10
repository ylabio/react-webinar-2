import React from "react";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import propTypes from "prop-types";
import List from "../list";
import CartItem from '../cart-item/cart-item'

function Cart({ cart, cartAmount, deleteItem }) {
  const cn = bem("Cart");

  return (
    <>
      {cart.length ? (
        <>
          <List items={cart} onButtonClick={deleteItem} itemRenderer={CartItem}/>{" "}
          <div className={cn("total")}>
            <span className={cn("total-title")}>Итого</span>
            <span className={cn("total-price")}>
              {cartAmount.toLocaleString("ru")} ₽
            </span>
          </div>
        </>
      ) : (
        <div className={cn("empty-title")}>
          Пока что тут пусто... {String.fromCodePoint(0x1f6d2)}
        </div>
      )}
    </>
  );
}

Cart.propTypes = {
  cart: propTypes.arrayOf(propTypes.object).isRequired,
  cartAmount: propTypes.number.isRequired,
  deleteItem: propTypes.func,
};

Cart.defaultProps = {
  deleteItem: () => {}
};

export default React.memo(Cart);

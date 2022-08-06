import React, { useRef } from "react";
import { cn as bem } from "@bem-react/classname";
const cn = bem("Cart");
import "./style.css";
import Button from "../button";
import CartList from "../cart-list";
import propTypes from "prop-types";

const Cart = ({ cartItems, totalPrice, closeModal, removeItem }) => {
  return (
    <div className={cn("container")}>
      <div className={cn()}>
        <div className={cn("top")}>
          <h1>Корзина</h1>
          <Button onClick={closeModal}>Закрыть</Button>
        </div>
        <CartList cartItems={cartItems} removeItem={removeItem} />
        <div className={cn("footer")}>
          <div className={cn("footer--total-price")}>
            <div>Итого:</div>
            <div>{totalPrice} ₽</div>
          </div>
        </div>
      </div>
    </div>
  );
};

Cart.propTypes = {
  cartItems: propTypes.arrayOf(propTypes.object).isRequired,
  totalPrice: propTypes.number.isRequired,
  closeModal: propTypes.func.isRequired,
  removeItem: propTypes.func.isRequired,
};

export default React.memo(Cart);

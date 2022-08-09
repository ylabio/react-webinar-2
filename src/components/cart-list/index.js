import React from "react";
import { cn as bem } from "@bem-react/classname";
import CartItem from "../cart-item";
import "./style.css";

const CartList = ({ cart, onDeleteItem }) => {
  const cn = bem("cart-list");
  return (
    <div className={cn()}>
      {cart.map((item) => {
        return (
          <CartItem key={item.code} item={item} onDeleteItem={onDeleteItem} />
        );
      })}
    </div>
  );
};

export default CartList;

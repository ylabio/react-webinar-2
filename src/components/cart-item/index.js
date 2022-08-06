import Button from "../button";
import React, { useState } from "react";
import { cn as bem } from "@bem-react/classname";
const cn = bem("Cart");
import "./style.css";
import propTypes from "prop-types";
const CartItem = ({ item, removeItem, code }) => {
  let total = item.price * item.count; // стоимость товара с учётом его количества
  return (
    <div className={cn("content")}>
      <div className={cn("content--left")}>
        <div>{item.code}</div>
        <div>{item.title}</div>
      </div>
      <div className={cn("content--right")}>
        <div>{total}₽</div>
        <div>{item.count} шт</div>
        <div onClick={removeItem}>
          <button onClick={() => removeItem(code)}>Удалить</button>
        </div>
      </div>
    </div>
  );
};

CartItem.propTypes = {
  item: propTypes.object.isRequired,
  removeItem: propTypes.func.isRequired,
  code: propTypes.number.isRequired,
};

export default CartItem;

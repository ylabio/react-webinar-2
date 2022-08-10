import React, { useCallback, useState } from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function ItemCart({ item, currency, onDeleteFromCart }) {
  const cn = bem("Item-cart");

  const callbacks = {
    onDeleteFromCart: useCallback(() => {
      onDeleteFromCart(item.code);
    }, [onDeleteFromCart, item]),
  };

  return (
    <div className={cn()}>
      <div className={cn("number")}>{item.code}</div>
      <div className={cn("title")}>{item.title}</div>
      <span className={cn("price")}>
        {item.price.toLocaleString("ru-RU") + " " + currency}
      </span>
      <div className={cn("amount")}>{item.amount} шт</div>
      <div className={cn("actions")}>
        <button onClick={callbacks.onDeleteFromCart}>Удалить</button>
      </div>
    </div>
  );
}

ItemCart.propTypes = {
  item: propTypes.object.isRequired,
  currency: propTypes.string.isRequired,
  onDeleteFromCart: propTypes.func.isRequired,
};

export default React.memo(ItemCart);

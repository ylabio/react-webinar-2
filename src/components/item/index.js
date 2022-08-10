import React, { useCallback, useState } from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function Item({ item, currency, onAddToCart }) {
  const cn = bem("Item");

  const callbacks = {
    onAddToCart: useCallback(() => {
      onAddToCart(item.code);
    }, [onAddToCart, item]),
  };

  return (
    <div className={cn()}>
      <div className={cn("number")}>{item.code}</div>
      <div className={cn("title")}>{item.title}</div>
      <span className={cn("price")}>
        {item.price.toLocaleString("ru-RU") + " " + currency}
      </span>
      <div className={cn("actions")}>
        <button onClick={callbacks.onAddToCart}>Добавить</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  currency: propTypes.string.isRequired,
  onAddToCart: propTypes.func.isRequired,
};

export default React.memo(Item);

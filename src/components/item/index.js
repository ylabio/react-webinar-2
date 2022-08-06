import React, { useCallback, useState } from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function Item({ item, currency, onAddToCart, onDeleteFromCart }) {
  const cn = bem("Item");

  const callbacks = {
    onAddToCart: useCallback(() => {
      onAddToCart(item.code);
    }, [onAddToCart, item]),
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

      {item.amount && <div className={cn("amount")}>{item.amount} шт</div>}
      <div className={cn("actions")}>
        {item.amount ? (
          <button onClick={callbacks.onDeleteFromCart}>Удалить</button>
        ) : (
          <button onClick={callbacks.onAddToCart}>Добавить</button>
        )}
      </div>
    </div>
  );
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  currency: propTypes.string.isRequired,
  onAddToCart: propTypes.func.isRequired,
  onDeleteFromCart: propTypes.func.isRequired,
};

Item.defaultProps = {
  item: {},
  currency: "",
  onAddToCart: () => {},
  onDeleteFromCart: () => {},
};

export default React.memo(Item);

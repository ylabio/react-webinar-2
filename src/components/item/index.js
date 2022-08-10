import React, { useCallback, useState } from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function Item({ item, addItemsToBasket }) {
  const cn = bem("Item");

  const callbacks = {
    onClick: useCallback(() => {
      addItemsToBasket(item);
    }, [addItemsToBasket, item]),
  };

  // Разбиваем большие числа на триады
  const price = item.price.toString().replace(/(\d)(?=(\d{3})+$)/g, "$1 ");

  return (
    <div className={cn()}>
      <div className={cn("number")}>{item.code}</div>
      <div className={cn("title")}>{item.title}</div>
      <div className={cn("price")}>{price + " ₽"}</div>
      <div className={cn("actions")}>
        <button onClick={callbacks.onClick}>Добавить</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  addItemsToBasket: propTypes.func.isRequired,
};

export default React.memo(Item);

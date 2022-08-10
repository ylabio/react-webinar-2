import React, { useCallback, useState } from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function BasketItem({ deleteItemsFromBasket, item }) {
  const cn = bem("BasketItem");

  const callbacks = {
    onClickDeleteItemInBasket: useCallback(() => {
      deleteItemsFromBasket(item);
    }, [deleteItemsFromBasket, item]),
  };

  // Разбиваем большие числа на триады
  const price = item.price.toString().replace(/(\d)(?=(\d{3})+$)/g, "$1 ");

  return (
    <div className={cn()}>
      <div className={cn("number")}>{item.code}</div>
      <div className={cn("title")}>{item.title}</div>
      <div className={cn("price")}>{price + " ₽"}</div>
      <div className={cn("amount")}>{item.amount + " шт"}</div>
      <div className={cn("actions")}>
        <button onClick={callbacks.onClickDeleteItemInBasket}>Удалить</button>
      </div>
    </div>
  );
}

BasketItem.propTypes = {
  deleteItemsFromBasket: propTypes.func.isRequired,
  item: propTypes.object.isRequired,
};

export default React.memo(BasketItem);

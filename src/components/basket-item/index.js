import React, { useCallback } from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

import Button from '../button';
function BasketItem({ order, deleteItem, uniqueOrder }) {
  const cn = bem("BasketItem");

  const callbacks = {
    onDeleteItem: useCallback(() => {
      deleteItem(order.code);
    }, []),
  };

  return (
    <div className={cn()}>
      <div className={cn("number")}>{order.code}</div>
      <div className={cn("title")}>{order.title}</div>
      <div className={cn("total")}>
        {order.total.toLocaleString("ru-RU", {
          style: "currency",
          currency: "RUB",
          minimumFractionDigits: 0, 
        })}{" "}
      </div>
      <div className={cn("count")}>
        {" "}
        <span>{order.count} </span> <span> шт</span>{" "}
      </div>

        <Button onClick={callbacks.onDeleteItem} children={'Удалить'}/>
    </div>
  );
}

BasketItem.propTypes = {
  order: propTypes.object.isRequired,
  onDeleteItem: propTypes.func,
};

BasketItem.defaultProps = {
  onDeleteItem: () => {},
};


export default React.memo(BasketItem);

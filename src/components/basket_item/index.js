import React, { useCallback } from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function BasketItem({ order, deleteItem }) {
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
        })}{" "}
      </div>
      <div className={cn("count")}>
        {" "}
        <span>{order.count} </span> <span> шт</span>{" "}
      </div>

      <div className={cn("actions")}>
        <button onClick={callbacks.onDeleteItem}>Удалить</button>
      </div>
    </div>
  );
}

BasketItem.propTypes = {
  order: propTypes.object.isRequired,
  onDeleteItem: propTypes.func.isRequired,
};

BasketItem.defaultProps = {
  onDeleteItem: () => {},
};

export default React.memo(BasketItem);

import React from "react";
import { useCallback } from "react";
import Button from "../button";
import "./style.css";

const CartOrder = ({ order, onDelete }) => {
  const callbacks = {
    onItemDelete: useCallback(
      (e) => {
        e.stopPropagation();
        onDelete(order.code);
      },
      [onDelete, order]
    ),
  };

  return (
    <li className="OrderItem" key={order.code}>
      <span className="">{order.code}</span>
      <span className="">{order.title}</span>
      <span className="">{order.price}</span>
      <div className="">
        {order.total.toLocaleString("ru-RU", {
          style: "currency",
          currency: "RUB",
        })}
      </div>
      <div className="">
        <span>{order.count} </span> <span> шт</span>{" "}
      </div>
      <div className="">
        <Button type="button" onClick={callbacks.onItemDelete}>
          Удалить
        </Button>
      </div>
    </li>
  );
};

export default React.memo(CartOrder);

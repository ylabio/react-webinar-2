import React from "react";
import { useCallback } from "react";
import Button from "../button";
import propTypes from "prop-types";
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
      <span className="OderCode">{order.code}</span>
      <span className="OderTitle">{order.title}</span>
      <div className="Total">
        {order.total.toLocaleString("ru-RU", {
          style: "currency",
          currency: "RUB",
          minimumFractionDigits: 0,
        })}
      </div>
      <div className="Count">
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

CartOrder.propTypes = {
  onDelete: propTypes.func.isRequired,
  orders: propTypes.arrayOf(propTypes.object).isRequired,
};

CartOrder.defaultProps = {
  onDelete: () => {},
  orders: [],
};

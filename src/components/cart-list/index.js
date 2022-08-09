import React from "react";
import CartOrder from "../cart-order";
import "./style.css";

const CartList = ({ orders, onItemDelete, total }) => {
  return (
    <>
      {orders.map((order) => (
        <ul key={order.code} className="Order">
          <CartOrder order={order} onDelete={onItemDelete} />
        </ul>
      ))}

      <div className="">
        Итого:
        <span>
          {total.toLocaleString("ru-RU", {
            style: "currency",
            currency: "RUB",
          })}
        </span>
      </div>
    </>
  );
};

export default React.memo(CartList);

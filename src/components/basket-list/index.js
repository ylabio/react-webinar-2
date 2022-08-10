import React from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import BasketItem from "../basket-item";

function BasketList({ orders, deleteItem }) {
  const cn = bem("BasketList");
  return (
    <div className={cn()}>
      {orders.map((order) => (
        <div key={order.code} className={cn("order")}>
          <BasketItem order={order} deleteItem={deleteItem} />
        </div>
      ))}
    </div>
  );
}
BasketList.propTypes = {
  deleteItem: propTypes.func,
  orders: propTypes.arrayOf(propTypes.object).isRequired,
};


BasketList.defaultProps = {
  deleteItem: () => {},
};

export default React.memo(BasketList);
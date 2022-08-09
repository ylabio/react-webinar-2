import React from "react";
import CartOrder from "../cart-order";
import propTypes from "prop-types";
import "./style.css";

const CartList = ({ orders, onItemDelete, total }) => {
  return (
    <>
      {orders.map((order) => (
        <ul key={order.code} className="Order">
          <CartOrder order={order} onDelete={onItemDelete} />
        </ul>
      ))}

      <div className="TotalSum">
        Итого:
        <span className="TotalCurrency">
          {total.toLocaleString("ru-RU", {
            style: "currency",
            currency: "RUB",
            minimumFractionDigits: 0,
          })}
        </span>
      </div>
    </>
  );
};

export default React.memo(CartList);

CartList.propTypes = {
  onItemDelete: propTypes.func.isRequired,
  orders: propTypes.arrayOf(propTypes.object).isRequired,
  total: propTypes.number.isRequired,
};

CartList.defaultProps = {
  onItemDelete: () => {},
  orders: [],
  openModal: () => {},
  total: 0,
};

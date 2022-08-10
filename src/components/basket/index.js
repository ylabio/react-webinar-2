import React from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import BasketList from "../basket-list";

import Button from "../button";
function Basket({ orders, deleteItem, closeModal, totalPrice, head, uniqueOrder }) {
  const cn = bem("Basket");

  return (
    <div className={cn()}>
      <div className={cn("head")}>
        {head}
        <Button onClick={closeModal} children={"Закрыть"} />
      </div>

      <div className={cn("content")}>
        <BasketList orders={orders} deleteItem={deleteItem} uniqueOrder={uniqueOrder}/>
      </div>

      <div className={cn("total")}>
        <span>Итого</span>
        <span>
          {totalPrice.toLocaleString("ru-RU", {
            style: "currency",
            currency: "RUB",
            minimumFractionDigits: 0,
          })}
        </span>
      </div>
    </div>
  );
}

Basket.propTypes = {
  deleteItem: propTypes.func,
  orders: propTypes.arrayOf(propTypes.object).isRequired,
  openModal: propTypes.func,
  totalPrice: propTypes.number.isRequired,
};

BasketList.defaultProps = {
  deleteItem: () => {},
  openModal: () => {},
};


export default React.memo(Basket);

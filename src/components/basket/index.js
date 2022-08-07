import React from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import BasketList from "../basket_list";

function Basket({ orders, deleteItem, closeModal, totalPrice }) {
  const cn = bem("Basket");

  return (
    <div className={cn()}>
      <div className={cn("head")}>
        <h1>Корзина</h1>
        <button type="button" onClick={closeModal} className={cn("btn_close")}>
          Закрыть
        </button>
      </div>

      <div className={cn("content")}>
        <BasketList orders={orders} deleteItem={deleteItem} />
      </div>

      <div className={cn("total")}>
        <span>Итого:</span>
        <span>
          {totalPrice.toLocaleString("ru-RU", {
            style: "currency",
            currency: "RUB",
          })}
        </span>
      </div>
    </div>
  );
}

Basket.propTypes = {
  deleteItem: propTypes.func.isRequired,
  orders: propTypes.arrayOf(propTypes.object).isRequired,
  openModal: propTypes.func.isRequired,
  totalPrice: propTypes.number.isRequired,
};

Basket.defaultProps = {
  deleteItem: () => {},
  orders: [],
  openModal: () => {},
  totalPrice: 0,
};

export default React.memo(Basket);

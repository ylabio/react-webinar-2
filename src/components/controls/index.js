import React from "react";
import plural from "plural-ru";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function Controls({ openModal, orders, totalPrice }) {
  const cn = bem("Controls");
  return (
    <div className={cn()}>
      <div className={cn("text")}>В корзине: </div>
      <span className={cn("total")}>
        {orders.length
          ? `${orders.length} ${plural(
              orders.length,
              "товар",
              "товара",
              "товаров"
            )} / ${totalPrice.toLocaleString("ru-RU", {
              style: "currency",
              currency: "RUB",
            })} `
          : "пусто"}
      </span>
      <button onClick={openModal} type="button">
        Перейти
      </button>
    </div>
  );
}

Controls.propTypes = {
  openModal: propTypes.func.isRequired, // Обяхательное свойство - функция
  orders: propTypes.arrayOf(propTypes.object).isRequired,
  totalPrice: propTypes.number.isRequired,
};

Controls.defaultProps = {
  openModal: () => {}, // Значение по умолчанию - функция-заглушка
  orders: [],
  totalPrice: 0,
};

export default React.memo(Controls);

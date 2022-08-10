import React from "react";
import plural from "plural-ru";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

import Button from '../button';
function Controls({ openModal, totalPrice, uniqueOrder }) {
  const cn = bem("Controls");
  return (
    <div className={cn()}>
      <div className={cn("text")}>В корзине: </div>
      <span className={cn("total")}>
        {uniqueOrder
          ? `${uniqueOrder} ${plural(
            uniqueOrder,
              "товар",
              "товара",
              "товаров"
            )} / ${totalPrice.toLocaleString("ru-RU", {
              style: "currency",
              currency: "RUB",
              minimumFractionDigits: 0, 
            })} `
          : "пусто"}
      </span>
      <Button onClick={openModal} children={'Перейти'} />
       
    </div>
  );
}

Controls.propTypes = {
  openModal: propTypes.func, // Обяхательное свойство - функция
  orders: propTypes.arrayOf(propTypes.object).isRequired,
  totalPrice: propTypes.number.isRequired,
};

Controls.defaultProps = {
  openModal: () => {},
};

export default React.memo(Controls);

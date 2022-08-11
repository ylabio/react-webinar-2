import React from "react";
import propTypes from "prop-types";
import "./style.css";
import { cn as bem } from "@bem-react/classname";
import plural from "plural-ru";

function Controls(props) {
  const cn = bem("Controls");

  const itemInBasket = `${props.totalAmount} ${plural(
    props.totalAmount,
    "товар",
    "товара",
    "товаров"
  )} / ${props.totalPrice}`;

  return (
    <div className={cn()}>
      <p className={cn("basket")}>
        В корзине:
        <span className={cn("basketInfo")}>
          {props.totalAmount ? itemInBasket : "пусто"}
        </span>
      </p>
      <button className={cn("button")} onClick={props.onOpenModal}>
        Перейти
      </button>
    </div>
  );
}

Controls.propTypes = {
  stateBasket: propTypes.array.isRequired,
  onOpenModal: propTypes.func.isRequired,
};

export default Controls;

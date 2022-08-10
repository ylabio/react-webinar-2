import React from "react";
import propTypes from "prop-types";
import "./style.css";
import { cn as bem } from "@bem-react/classname";
import plural from "plural-ru";

function Controls(props) {
  const cn = bem("Controls");

  let itemInBasket = "пусто";
  let lengthStateBasket = props.stateBasket.length;

  if (lengthStateBasket) {
    let price = props.calculationSumPrice(props.stateBasket);

    price = new Intl.NumberFormat("ru-RU", {
      style: "currency",
      currency: "RUB",
      currencyDisplay: "symbol",
      maximumFractionDigits: 0,
    }).format(price);

    itemInBasket = `${lengthStateBasket} ${plural(
      lengthStateBasket,
      "товар",
      "товара",
      "товаров"
    )} / ${price}`;
  }

  return (
    <div className={cn()}>
      <p className={cn("basket")}>
        В корзине:
        <span className={cn("basketInfo")}>{itemInBasket}</span>
      </p>
      <button className={cn("button")} onClick={props.onOpenModal}>Перейти</button>
    </div>
  );
}

Controls.propTypes = {
  stateBasket: propTypes.array.isRequired,
  onOpenModal: propTypes.func.isRequired
};

Controls.defaultProps = {
  stateBasket: [],
  onOpenModal: () => {}
};

export default Controls;

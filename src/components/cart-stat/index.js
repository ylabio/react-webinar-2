import React from "react";
import { cn as bem } from "@bem-react/classname";
import plural from "plural-ru";
import "./style.css";
import propTypes from "prop-types";

function CartStat({ price, quantity, onOpenCart }) {
  let stat = "пусто";
  if (quantity) {
    const noun_form = plural(quantity, "товар", "товара", "товаров");
    stat = `${quantity} ${noun_form} / ${price.toLocaleString("ru-RU")} ₽`;
  }

  const cn = bem("CartStat");

  return (
    <div className={cn()}>
      <span className={cn("label")}>
        В корзине: <span>{stat}</span>
      </span>
      <button className="justify-button" onClick={onOpenCart}>
        Перейти
      </button>
    </div>
  );
}

CartStat.propTypes = {
  price: propTypes.number.isRequired,
  quantity: propTypes.number.isRequired,
  onOpenCart: propTypes.func.isRequired,
};

export default React.memo(CartStat);

import React from "react";
import { cn as bem } from "@bem-react/classname";
import { get_cart_total_values } from "../../utils.js";
import plural from "plural-ru";
import "./style.css";

function CartStat(props) {
  const { cart } = props;
  let stat = "пусто";
  if (cart.length) {
    const { total_price, total_quantity } = get_cart_total_values(cart);
    const noun_form = plural(total_quantity, "товар", "товара", "товаров");
    stat = `${total_quantity} ${noun_form} / ${total_price} ₽`;
  }

  const cn = bem("CardStat");

  return (
    <div className={cn()}>
      <span className={cn("label")}>
        В корзине: <span>{stat}</span>
      </span>
      <button className="justify-button">Перейти</button>
    </div>
  );
}

export default CartStat;

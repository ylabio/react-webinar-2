import React from "react";
import { cn as bem } from "@bem-react/classname";
import { get_cart_total_values } from "../../utils.js";
import plural from "plural-ru";
import "./style.css";
import propTypes from "prop-types";

function CartStat({ cart, onOpenCart }) {
  let stat = "пусто";
  const { total_price, total_quantity } = get_cart_total_values(cart);
  if (total_quantity) {
    const noun_form = plural(total_quantity, "товар", "товара", "товаров");
    stat = `${total_quantity} ${noun_form} / ${total_price} ₽`;
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
  cart: propTypes.arrayOf(propTypes.object).isRequired,
  onOpenCart: propTypes.func.isRequired,
};

export default React.memo(CartStat);

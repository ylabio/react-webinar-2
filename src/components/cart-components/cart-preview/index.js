import React from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import plural from "plural-ru";
import "./style.css";

function CartPreview({ uniqItemsInCart, cartTotal, currency, openCartModal }) {
  const cn = bem("Cart_preview");

  return (
    <div className={cn()}>
      <div>В корзине:</div>
      {uniqItemsInCart ? (
        <div className={cn("total")}>
          {uniqItemsInCart}{" "}
          {plural(uniqItemsInCart, "товар", "товара", "товаров")}
          {" / "}
          {cartTotal.toLocaleString("ru-RU")} {currency}
        </div>
      ) : (
        <div className={cn("total")}>пусто</div>
      )}
      <div className={cn("actions")}>
        <button onClick={openCartModal}>Перейти</button>
      </div>
    </div>
  );
}

CartPreview.propTypes = {
  uniqItemsInCart: propTypes.number.isRequired,
  cartTotal: propTypes.number.isRequired,
  currency: propTypes.string.isRequired,
  openCartModal: propTypes.func.isRequired,
};

export default React.memo(CartPreview);

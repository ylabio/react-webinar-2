import React from "react";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import propTypes from "prop-types";

const CartPrice = ({ cartPrice }) => {
  const cn = bem("cart-price");

  return (
    <div className={cn()}>
      {cartPrice.count ? (
        <span className={cn("total")}>
          <strong>Итого </strong>
        </span>
      ) : (
        <span className={cn("total")}>
          <strong>Корзина пуста</strong>
        </span>
      )}
      <span>
        {cartPrice.count
          ? `${cartPrice.price.toLocaleString("ru-RU")} ₽`
          : null}
      </span>
    </div>
  );
};

CartPrice.propTypes = {
  cartPrice: propTypes.object.isRequired,
};

export default CartPrice;

import React from "react";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import propTypes from "prop-types";

const CartPrice = ({ cartPrice }) => {
  const cn = bem("cart-price");

  if (cartPrice.price > 0 && cartPrice.count > 0) {
    return (
      <div className={cn()}>
        <span className={cn("total")}>
          <strong>Итого </strong>
        </span>
        <span>
          <strong>{cartPrice.price.toLocaleString("ru-RU")}</strong>
        </span>
      </div>
    );
  }
};

CartPrice.propTypes = {
  cartPrice: propTypes.object.isRequired,
};

export default CartPrice;

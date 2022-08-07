import React, { memo } from "react";
import propTypes from "prop-types";
import plural from "plural-ru";
import "./style.css";

function BasketDisplay({ amount, price }) {
  return (
    <div className="BasketDisplay">
      <span>В корзине:</span>
      <span>
        {amount < 1
          ? "пусто"
          : `${amount} ${plural(
              amount,
              "товар",
              "товара",
              "товаров"
            )} / ${price} ₽`}
      </span>
    </div>
  );
}

BasketDisplay.propTypes = {
  amount: propTypes.number.isRequired,
  price: propTypes.number.isRequired,
};

BasketDisplay.defaultProp = {
  amount: 0,
  price: 0,
};

export default memo(BasketDisplay);

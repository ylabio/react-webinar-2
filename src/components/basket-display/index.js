import React, { memo } from "react";
import propTypes from "prop-types";
import plural from "plural-ru";
import "./style.css";
import { getFormatedPrice } from "../../utils";

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
            )} / ${getFormatedPrice(price)}`}
      </span>
    </div>
  );
}

BasketDisplay.propTypes = {
  amount: propTypes.number.isRequired,
  price: propTypes.number.isRequired,
};

export default memo(BasketDisplay);

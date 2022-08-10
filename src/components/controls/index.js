import React from "react";
import propTypes from "prop-types";
import "./style.css";
import plural from "plural-ru";

function Controls({ getModal, amountBasketItems, totalPrice }) {
  const price = totalPrice.toString().replace(/(\d)(?=(\d{3})+$)/g, "$1 ");

  return (
    <div className="Controls">
      <div> В корзине:</div>
      <div>
        <b>
          {amountBasketItems
            ? `${amountBasketItems} ${plural(
                amountBasketItems,
                "товар",
                "товара",
                "товаров"
              )} / ${price} ₽`
            : "пусто"}
        </b>
      </div>
      <button className="openCart" onClick={() => getModal(true)}>
        Перейти
      </button>
    </div>
  );
}

Controls.propTypes = {
  getModal: propTypes.func.isRequired,
  amountBasketItems: propTypes.number.isRequired,
  totalPrice: propTypes.number.isRequired,
};

Controls.defaultProps = {};

export default React.memo(Controls);

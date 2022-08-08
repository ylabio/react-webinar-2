import React from "react";
import propTypes from "prop-types";
import "./style.css";
import plural from "plural-ru";

function Controls({ getModal, amountBasketItems, totalPrice }) {
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
              )} / ${totalPrice} ₽`
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

Controls.defaultProps = {
  getModal: () => {},
  amountBasketItems: 0,
  totalPrice: 0,
};

export default React.memo(Controls);

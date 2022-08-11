import React from "react";
import propTypes from "prop-types";
import plural from "plural-ru";
import "./style.css";

function Controls({ openToCart, overall, quantity }) {
  return (
    <div className="Controls">
      <div>
        В корзине:
        <span>
          {quantity
            ? `${quantity} ${plural(
                quantity,
                "товар",
                "товара",
                "товаров"
              )} / ${overall.toLocaleString()} ₽`
            : "пусто"}
        </span>
      </div>
      <button onClick={openToCart}>Перейти</button>
    </div>
  );
}

Controls.propTypes = {
  overall: propTypes.number.isRequired,
  quantity: propTypes.number.isRequired,
  openToCart: propTypes.func.isRequired, // Обязательное свойство - функция
};

Controls.defaultProps = {
  openToCart: () => {}, // Значение по умолчанию - функция-заглушка
};

export default React.memo(Controls);

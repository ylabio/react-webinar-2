import React from "react";
import propTypes from "prop-types";
import plural from "plural-ru";
import "./style.css";

function Controls({ toCard, cardValue, totalPrice }) {
  
  return (
    <div className="Controls">
      <p className="Controls__info">
        В корзине:
        {Boolean(cardValue.length) ? (
          <b>
            {cardValue.length}{" "}
            {plural(cardValue.length, "товар", "товара", "товаров")}/
            {new Intl.NumberFormat("ru", {
                style: "currency",
                currency: "RUB",
              }).format(totalPrice)}
          </b>
        ) : (
          <b>пусто</b>
        )}
      </p>
      <button onClick={toCard}>Корзина</button>
    </div>
  );
}

Controls.propTypes = {
  toCard: propTypes.func.isRequired, // Обяхательное свойство - функция
};

Controls.defaultProps = {
  toCard: () => {}, // Значение по умолчанию - функция-заглушка
};

export default React.memo(Controls);

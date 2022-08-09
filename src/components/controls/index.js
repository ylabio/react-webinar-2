import React from "react";
import propTypes from "prop-types";
import "./style.css";
import Button from "../button/index.js";
import plural from "plural-ru";

function Controls({ toggleOnClick, orders, total }) {
  const currency = total.toLocaleString("ru-RU", {
    style: "currency",
    currency: "RUB",
  });
  return (
    <div className="Controls">
      <div>
        В корзине:
        <span className="">
          {orders.length
            ? `${orders.length} ${plural(
                orders.length,
                "товар",
                "товара",
                "товаров"
              )} / ${currency} `
            : "пусто"}
        </span>
      </div>
      <Button type="button" onClick={toggleOnClick}>
        Перейти
      </Button>
    </div>
  );
}

Controls.propTypes = {
  toggleOnClick: propTypes.func.isRequired, // Обязательное свойство - функция
};

Controls.defaultProps = {
  toggleOnClick: () => {}, // Значение по умолчанию - функция-заглушка
};

export default React.memo(Controls);

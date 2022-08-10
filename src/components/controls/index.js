import React from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import plural from "plural-ru";
import "./style.css";

function Controls({ isShow, countCartItems, sumCart }) {
  const cn = bem("Controls");
  return (
    <div className={cn()}>
      <div>
        {countCartItems > 0 && (
          <h4>
            В корзине: {countCartItems}{" "}
            {plural(countCartItems, "товар", "товара", "товаров")} /{" "}
            {sumCart.toLocaleString("ru-RU", {
              style: "currency",
              currency: "RUB",
              minimumFractionDigits: 0,
            })}
          </h4>
        )}
        {countCartItems == 0 && <h4>В корзине: пусто</h4>}
      </div>

      <div>
        <button className={cn("button")} onClick={isShow}>
          Перейти
        </button>
      </div>
    </div>
  );
}

Controls.propTypes = {
  isShow: propTypes.func.isRequired, // Обяхательное свойство - функция
};

Controls.defaultProps = {
  isShow: () => {}, // Значение по умолчанию - функция-заглушка
};

export default React.memo(Controls);

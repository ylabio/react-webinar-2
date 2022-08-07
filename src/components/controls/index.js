import React from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import plural from "plural-ru";
import "./style.css";

function Controls({ onCartClick, cartLength, amount }) {
  const cn = bem("Controls");
  
  return (
    <div className={cn()}>
      <>
        <div className={cn("title", {emptyCart: !cartLength})}>В корзине:</div>

        <div className={cn("total")}>
          {cartLength ? (
            <>
              {cartLength} {plural(cartLength, "товар", "товара", "товаров")} /{" "}
              {amount.toLocaleString('ru')} ₽
            </>
          ) : (
            "пусто"
          )}
        </div>
      </>

      <button onClick={onCartClick}>Перейти</button>
    </div>
  );
}

Controls.propTypes = {
  onCartClick: propTypes.func.isRequired, // Обязательное свойство - функция
  cartLength: propTypes.number.isRequired,
  amount: propTypes.number.isRequired,
};

Controls.defaultProps = {
  onCartClick: () => {}, // Значение по умолчанию - функция-заглушка
  cartLength: 0,
  amount: 0,
};

export default React.memo(Controls);

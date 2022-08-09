import React from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import plural from "plural-ru";
import "./style.css";

function Controls({ onCartClick, uniqueItems, amount }) {
  const cn = bem("Controls");
  
  return (
    <div className={cn()}>
      <>
        <div className={cn("title", {emptyCart: !uniqueItems})}>В корзине:</div>

        <div className={cn("total")}>
          {uniqueItems ? (
            <>
              {uniqueItems} {plural(uniqueItems, "товар", "товара", "товаров")} /{" "}
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
  onCartClick: propTypes.func, 
  uniqueItems: propTypes.number,
  amount: propTypes.number,
};

Controls.defaultProps = {
  onCartClick: () => {}, // Значение по умолчанию - функция-заглушка
  uniqueItems: 0,
  amount: 0,
};

export default React.memo(Controls);

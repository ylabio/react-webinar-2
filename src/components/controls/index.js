import React from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import plural from "plural-ru";

function Controls({ priceAndCount, showModal, allItems }) {
  const cn = bem("Controls");

  return (
    <div className="Controls">
      {priceAndCount.price !== 0 || priceAndCount.count !== 0 ? (
        <span className={cn("price")}>
          В корзине:{" "}
          <strong className={cn("price-rub")}>
            {allItems} {plural(allItems, "товар", "товара", "товаров")} /{" "}
            {priceAndCount.price.toLocaleString("ru-RU")}
          </strong>
        </span>
      ) : (
        <span className={cn("price")}>
          В корзине: <strong>Пусто</strong>
        </span>
      )}

      <button onClick={showModal}>Перейти</button>
    </div>
  );
}

Controls.propTypes = {
  showModal: propTypes.func.isRequired,
};

Controls.defaultProps = {
  showModal: () => {},
};

export default React.memo(Controls);

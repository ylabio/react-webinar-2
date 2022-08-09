import React from "react";
import propTypes from "prop-types";
import plural from "plural-ru";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function Buy({ allPrice, allItems, setModal }) {
  const cn = bem("Buy");

  return (
    <div className={cn()}>
      <span>
        В корзине:{" "}
        <b>
          {allItems > 0
            ? `${allItems} ${plural(
                allItems,
                "товар",
                "товара",
                "товаров"
              )} / ${allPrice.toLocaleString("ru-RU")} ₽`
            : "пусто"}
        </b>
      </span>
      <button onClick={() => setModal(true)}>Перейти</button>
    </div>
  );
}

Buy.propTypes = {
  setModal: propTypes.func,
  allPrice: propTypes.number,
  allItems: propTypes.number,
};

Buy.defaultProps = {
  setModal: () => {},
  allPrice: 0,
  allItems: 0,
};

export default React.memo(Buy);

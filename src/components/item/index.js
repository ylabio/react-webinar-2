import React from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function Item({ item, onButtonClick, inCart}) {
  const cn = bem("Item");

  return (
    <div className={cn()}>
      {<div className={cn("number")}>{item.code}</div>}

      <div className={cn("title")}>{item.title}</div>
      <div className={cn("price",{cart: inCart})}>{item.price.toLocaleString("ru")} ₽</div>
      {inCart && <div className={cn("quantity")}>{item.quantity} шт</div>}

      <div className={cn("actions")}>
        <button onClick={() => onButtonClick(item)}>
          {inCart ? "Удалить" : "Добавить"}
        </button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  onButtonClick: propTypes.func.isRequired,
  inCart: propTypes.bool.isRequired,
};

Item.defaultProps = {
  item: {},
  onButtonClick: () => {},
  inCart: false,
};

export default React.memo(Item);

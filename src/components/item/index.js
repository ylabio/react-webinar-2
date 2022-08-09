import React from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function Item({ item, onButtonClick }) {
  const cn = bem("Item");
  console.log("item")
  return (
    <div className={cn()}>
      {<div className={cn("number")}>{item.code}</div>}

      <div className={cn("title")}>{item.title}</div>
      <div className={cn("price")}>{item.price.toLocaleString("ru")} ₽</div>

      <div className={cn("actions")}>
        <button onClick={() => onButtonClick(item.code)}>Добавить</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  onButtonClick: propTypes.func,
};

Item.defaultProps = {
  onButtonClick: () => {},
};

export default React.memo(Item);

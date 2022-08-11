import React from "react";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import propTypes from "prop-types";

function Item({ item, addItemInCart }) {
  const cn = bem("Item");

  return (
    <div className={"List-item"}>
      <div className={cn()}>
        <div className={cn("number")}>{item.code}</div>
        <div className={cn("title")}>{item.title}</div>
        <div className={cn("actions")}>
          <div className={cn("actions--price")}>
            <div>{item.price.toLocaleString()} </div>
            <div>₽</div>
          </div>
          <button onClick={() => addItemInCart(item)}>Добавить</button>
        </div>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  addItemInCart: propTypes.func.isRequired,
};

export default React.memo(Item);

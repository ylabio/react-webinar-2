import React from "react";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import propTypes from "prop-types";
import Button from "../button";

function Item({ item, addItemInCart }) {
  const cn = bem("Item");

  return (
    <div className={cn()}>
      <div className={cn("number")}>{item.code}</div>
      <div className={cn("title")}>{item.title}</div>
      <div className={cn("actions")}>
        <div className={cn("actions--price")}>
          <div>{item.price} </div>
          <div>₽</div>
        </div>
        <Button onClick={() => addItemInCart(item.code)}>Добавить</Button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  addItemInCart: propTypes.func.isRequired,
};

export default React.memo(Item);

import React, { useCallback, useState } from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function Item({ item, onAdd }) {
  const cn = bem("Item");

  return (
    <div className={cn()}>
      <div className={cn("number")}>{item.code}</div>
      <div className={cn("title")}>{item.title}</div>
      <div className={cn("price")}>
        {item.price.toLocaleString("ru-RU", {
          style: "currency",
          currency: "RUB",
        })}{" "}
      </div>
      <div className={cn("actions")}>
        <button onClick={() => onAdd(item)}>Добавить</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  onAdd: propTypes.func.isRequired,
};

Item.defaultProps = {
  onAdd: () => {},
};

export default React.memo(Item);

import React, { useCallback } from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function ItemBasket(props) {
  const cn = bem("ItemBasket");

  const callbacks = {
    onDelete: useCallback(
      (e) => {
        e.stopPropagation();
        props.onDelete(props.item);
      },
      [props.onDelete, props.item]
    ),
  };

  return (
    <div className={cn()}>
      <div className={cn("number")}>{props.item.code}</div>
      <div className={cn("title")}>{props.item.title}</div>
      <div className={cn("info")}>
        <span className={cn("price")}>
          {props.item.price?.toLocaleString()} ₽
        </span>
        <span className={cn("amount")}>
          {props.item.amount?.toLocaleString() || 0} шт
        </span>
      </div>

      <div className={cn("actions")}>
        <button onClick={callbacks.onDelete}>Удалить</button>
      </div>
    </div>
  );
}

ItemBasket.propTypes = {
  item: propTypes.object.isRequired,
  onDelete: propTypes.func.isRequired,
};

ItemBasket.defaultProps = {
  onDelete: () => {},
};

export default React.memo(ItemBasket);

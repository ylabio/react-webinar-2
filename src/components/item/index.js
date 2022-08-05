import React, { useCallback } from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function Item(props) {
  const cn = bem("Item");

  const callbacks = {
    onDelete: useCallback(
      (e) => {
        e.stopPropagation();
        props.onDelete(props.item.code);
      },
      [props.onDelete, props.item]
    ),
    onAddItemToCart: useCallback(() => {
      props.onAddItemToCart(props.item);
    }, [props.onAddItemToCart, props.item]),
  };

  return (
    <div className={cn()}>
      <div className={cn("number")}>{props.item.code}</div>
      <div className={cn("title")}>{props.item.title}</div>
      <div className={cn("price")}>{props.item.price + "\u20BD"}</div>
      <div className={cn("actions")}>
        {props.isMainContent ? (
          <button onClick={callbacks.onAddItemToCart}>Добавить</button>
        ) : (
          <button onClick={callbacks.onDelete}>Удалить</button>
        )}
      </div>
    </div>
  );
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  onDeleted: propTypes.func.isRequired,
  onAddItemToCart: propTypes.func.isRequired,
};

Item.defaultProps = {
  onDeleted: () => {},
  onAddItemToCart: () => {},
};

export default React.memo(Item);

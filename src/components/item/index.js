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
    }, [props.onAddItemToCart, props.item, props.setConsolidationItems]),
  };

  return (
    <div className={cn()}>
      <div className={cn("number")}>{props.item.code}</div>
      <div className={cn("title")}>{props.item.title}</div>
      <div className={cn("price")}>
        {props.isMainContent ? props.item.price : props.item.totalPrice}
      </div>
      <div className={cn("symbol")}>{"\u20BD"}</div>
      {props.isMainContent ?? (
        <div className={cn("count")}>{props.item.count}</div>
      )}
      {props.isMainContent ?? <div className={cn("symbol")}>шт</div>}
      <div className={cn("actions")}>
        {props.isMainContent ? (
          <button className={cn("button")} onClick={callbacks.onAddItemToCart}>
            Добавить
          </button>
        ) : (
          <button className={cn("button")} onClick={callbacks.onDelete}>
            Удалить
          </button>
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
  item: {},
  onDeleted: () => {},
  onAddItemToCart: () => {},
};

export default React.memo(Item);

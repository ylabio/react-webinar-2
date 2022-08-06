import React, { useCallback } from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function Item(props) {
  const cn = bem("Item");

  // Счётчик выделений

  const callbacks = {
    onAddItem: useCallback(
      (e) => {
        e.stopPropagation();
        props.onAddItem(props.item.code);
      },
      [props.onAddItem, props.item]
    ),
    onDeleteItem: useCallback(() => {
      props.onDeleteItem(props.item.code);
    }, [props.onDeleteItem, props.item]),
  };

  return (
    <div className={cn()}>
      <div className={cn("number")}>
        {props.item.amount ? props.index + 1 : props.item.code}
      </div>
      <div className={cn("title")}>
        <p> {props.item.title}</p>
        <div className={cn("info-wrapper")}>
          {" "}
          <p
            className={
              props.item.amount
                ? "Item-price" + " " + "Item-price-scope"
                : "Item-price"
            }
          >
            {props.item.price}
          </p>
          <p className={cn("amount")}>
            {props.item.amount ? <>{props.item.amount} шт</> : null}
          </p>
        </div>
      </div>
      <div className={cn("actions")}>
        <button
          onClick={
            props.item.amount ? callbacks.onDeleteItem : callbacks.onAddItem
          }
        >
          {props.item.amount ? "Удалить" : "Добавить"}
        </button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  onAddItem: propTypes.func.isRequired,
  onDeleteItem: propTypes.func.isRequired,
};

Item.defaultProps = {
  onAddItem: () => {},
  inDeleteItem: () => {},
};

export default React.memo(Item);

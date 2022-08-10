import React, { useCallback, useState } from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import plural from "plural-ru";
import "./style.css";

function Item(props) {
  const cn = bem("Item");

  const callbacks = {
    onClick: useCallback(() => {
      props.onSelect(props.item);
    }, [props.onSelect, props.item]),

    onDelete: useCallback(
      (e) => {
        e.stopPropagation();
        props.onDelete(props.item.code);
      },
      [props.onDelete, props.item]
    ),
  };

  return (
    <div className={cn()}>
      <div className={cn("number")}>{props.item.code}</div>
      <div className={cn("title")}>
        <div>{props.item.title}</div>
        <div>
          {props.item.price.toLocaleString("ru-RU", {
            style: "currency",
            currency: "RUB",
            minimumFractionDigits: 0,
          })}
        </div>
      </div>
      <div className={cn("actions")}>
        <button onClick={callbacks.onClick}>Добавить</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  onSelect: propTypes.func.isRequired,
  onDeleted: propTypes.func.isRequired,
};

Item.defaultProps = {
  onSelect: () => {},
  onDeleted: () => {},
};

export default React.memo(Item);

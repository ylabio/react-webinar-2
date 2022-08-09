import React, { useCallback } from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function Item(props) {
  const cn = bem("Item");

  const callbacks = {
    onAddItem: useCallback(
      (e) => {
        e.stopPropagation();
        props.onAddItem(props.item.code);
      },
      [props.onAddItem, props.item]
    ),
  };

  return (
    <div className={cn()}>
      <div className={cn("number")}>{props.item.code}</div>
      <div className={cn("title")}>
        <p> {props.item.title}</p>
        <div className={cn("info-wrapper")}>
          {" "}
          <p className={"Item-price"}>
            {props.item.price.toLocaleString("ru-RU")}
          </p>
        </div>
      </div>
      <div className={cn("actions")}>
        <button onClick={callbacks.onAddItem}>Добавить</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  onAddItem: propTypes.func.isRequired,
};

Item.defaultProps = {
  onAddItem: () => {},
};

export default React.memo(Item);

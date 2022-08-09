import React, { useCallback } from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import Button from "../button/index.js";
import "./style.css";

function Item(props) {
  const cn = bem("Item");

  const callbacks = {
    onAdd: useCallback(() => {
      props.onAdd(props.item);
    }, [props.onAdd, props.item]),
  };

  const sum = props.item.price.toLocaleString("ru-RU", {
    style: "currency",
    currency: "RUB",
    minimumFractionDigits: 0,
  });

  return (
    <div className={cn({ selected: props.item.selected })}>
      <div className={cn("number")}>{props.item.code}</div>
      <div className={cn("title")}>{props.item.title}</div>
      <div className={cn("actions")}>
        <div className={cn("price")}>{sum}</div>
        <Button type="button" onClick={() => callbacks.onAdd(props.item)}>
          Добавить
        </Button>
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

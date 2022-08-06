import React, { useCallback } from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import { changeNumber } from "../../utils";

function Item(props) {
  const cn = bem("Item");

  const callbacks = {
    onAdd: useCallback(() => {
      props.onAdd(props.item.code);
    }, [props.onAdd, props.item]),
  };

  return (
    <div className={cn()}>
      <div className={cn("number")}>{props.index + 1}</div>
      <div className={cn("title")}>{props.item.title}</div>
      <div className={cn("price")}>{changeNumber(props.item.price) + " ₽"}</div>
      <div className={cn("actions")}>
        <button onClick={callbacks.onAdd}>Добавить</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  index: propTypes.number.isRequired,
  onAddd: propTypes.func.isRequired,
};

Item.defaultProps = {
  item: {},
  onAddd: () => {},
  index: 1,
};

export default React.memo(Item);

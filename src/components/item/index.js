import React, { useCallback, useState } from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function Item(props) {
  const cn = bem("Item");

  const callbacks = {};

  return (
    <div className={cn({ selected: props.item.selected })}>
      <div className={cn("number")}>{props.item.code}</div>
      <div className={cn("title")}>{props.item.title}</div>
      <div className={cn("price")}>{`${props.item.price} ₽`}</div>
      <button className={`${cn("action")} justify-button`}>Добавить</button>
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

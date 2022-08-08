import React, { useCallback, useState } from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function Item(props) {
  const cn = bem("Item");

  const callbacks = {
    onClick: useCallback(() => {
      props.onButtonClick({
        code: props.item.code,
        title: props.item.title,
        price: props.item.price,
      });
    }),
  };

  return (
    <div className={cn({ selected: props.item.selected })}>
      <div className={cn("number")}>{props.item.code}</div>
      <div className={cn("title")}>{props.item.title}</div>
      <div className={cn("price")}>{`${props.item.price} ₽`}</div>
      {props.item.quantity && (
        <div className={cn("quantity")}>{`${props.item.quantity} шт`}</div>
      )}
      <button
        className={`${cn("action")} justify-button`}
        onClick={callbacks.onClick}
      >
        Добавить
      </button>
    </div>
  );
}

Item.propTypes = {
  item: propTypes.object.isRequired,
};

export default React.memo(Item);

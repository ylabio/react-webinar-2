import React, { useCallback, useState } from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function Item({ item, buttonLabel, onButtonClick }) {
  const cn = bem("Item");

  const callbacks = {
    onClick: useCallback(() => {
      onButtonClick({
        code: item.code,
        title: item.title,
        price: item.price,
      });
    }, [item, onButtonClick]),
  };

  return (
    <div className={cn({ selected: item.selected })}>
      <div className={cn("number")}>{item.code}</div>
      <div className={cn("title")}>{item.title}</div>
      <div className={cn("price")}>{`${item.price} ₽`}</div>
      {item.quantity && (
        <div className={cn("quantity")}>{`${item.quantity} шт`}</div>
      )}
      <button
        className={`${cn("action")} justify-button`}
        onClick={callbacks.onClick}
      >
        {buttonLabel}
      </button>
    </div>
  );
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  buttonLabel: propTypes.string.isRequired,
  onButtonClick: propTypes.func.isRequired,
};

export default React.memo(Item);

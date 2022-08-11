import React, { useCallback, useState } from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import { changeNumber } from "../../utils";

function CardItem({ item, index, onCardItemDelete }) {
  const cn = bem("Card-item");
  const callbacks = {
    onDelete: useCallback(() => {
      onCardItemDelete(item.code);
    }, [onCardItemDelete, item]),
  };

  return (
    <li className={cn()}>
      <div className={cn("number")}>{index + 1}</div>
      <div className={cn("title")}>{item.title}</div>
      <div className={cn("price")}>{changeNumber(item.price) + " ₽"}</div>
      <div className={cn("count")}>{item.count + " шт"}</div>
      <button className={cn("actions")} onClick={callbacks.onDelete}>
        Удалить
      </button>
    </li>
  );
}

CardItem.propTypes = {
  item: propTypes.object.isRequired,
  index: propTypes.number.isRequired,
  onCardItemDelete: propTypes.func.isRequired,
  changeNumber: propTypes.func.isRequired,
};

CardItem.defaultProps = {
  item: {},
  index: [],
  onCardItemDelete: () => {},
  changeNumber: () => {},
};
export default React.memo(CardItem);

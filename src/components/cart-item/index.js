import React, { useCallback, useState } from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function CartItem({ item, onDelete }) {
  const cn = bem("Cart-item");

  const callbacks = {
    onClickItemDelete: useCallback(() => {
      onDelete(item.code);
    }, [item, onDelete]),
  };

  return (
    <>
      <div>
        <div className={cn()}>
          <div className={cn("number")}>{item.code}</div>
          <div className={cn("title")}>{item.title}</div>
          <div className={cn("price")}>
            {item.price.toLocaleString("ru-RU", {
              style: "currency",
              currency: "RUB",
              minimumFractionDigits: 0,
            })}
          </div>
          <div className={cn("count")}>{item.count} шт</div>
          <button
            className={cn("actions")}
            onClick={callbacks.onClickItemDelete}
          >
            Удалить
          </button>
        </div>
      </div>
    </>
  );
}

CartItem.propTypes = {
  item: propTypes.object.isRequired,
  onDeleted: propTypes.func,
};

CartItem.defaultProps = {
  onDeleted: () => {},
};

export default React.memo(CartItem);

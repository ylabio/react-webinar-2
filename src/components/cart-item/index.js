import React, { useCallback, useState } from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function CartItem({ item, onDelete }) {
  console.log("cart-item props", onDelete);
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
          <div>
            {item.price.toLocaleString("ru-RU", {
              style: "currency",
              currency: "RUB",
              minimumFractionDigits: 0,
            })}
          </div>
          <div>{item.count} шт</div>
          <button
            className={cn("actions")}
            onClick={callbacks.onClickItemDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </>
    // <div
    //   className={cn({ selected: props.item.selected })}
    //   // onClick={callbacks.onClick}
    // >
    //   <div className={cn("number")}>{props.item.code}</div>
    //   <div className={cn("title")}>
    //     <div>{props.item.title}</div>
    //     <div>
    //       {props.item.price.toLocaleString("ru-RU", {
    //         style: "currency",
    //         currency: "RUB",
    //         minimumFractionDigits: 0,
    //       })}
    //     </div>
    //   </div>
    //   <div className={cn("actions")}>
    //     <button onClick={callbacks.onClick}>Добавить</button>
    //   </div>
    // </div>
  );
}

// Item.propTypes = {
//   item: propTypes.object.isRequired,
//   onSelect: propTypes.func.isRequired,
//   onDeleted: propTypes.func.isRequired,
// };

// Item.defaultProps = {
//   onSelect: () => {},
//   onDeleted: () => {},
// };

export default React.memo(CartItem);

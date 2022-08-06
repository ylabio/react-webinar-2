import React, { useCallback, useState } from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import plural from "plural-ru";
import "./style.css";

function Item({ item, addItem }) {
  const cn = bem("Item");

  // Счётчик выделений
  const [count, setCount] = useState(0);

  // const callbacks = {
  //   onClick: useCallback(() => {
  //     props.onSelect(props.item.code);
  //     if (!props.item.selected) {
  //       setCount(count + 1);
  //     }
  //   }, [props.onSelect, props.item, setCount, count]),

  //   onDelete: useCallback(
  //     (e) => {
  //       e.stopPropagation();
  //       props.onDelete(props.item.code);
  //     },
  //     [props.onDelete, props.item]
  //   ),
  // };

  return (
    <div className={cn()}>
      <div className={cn("number")}>{item.code}</div>
      <div className={cn("title")}>{item.title}</div>
      <div className={cn("price")}>{item.price} ₽</div>
      <div className={cn("actions")}>
        <button onClick={() => addItem(item)}>Добавить</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  addItem: propTypes.func,
};

Item.defaultProps = {
  addItem: () => {},
};

export default React.memo(Item);

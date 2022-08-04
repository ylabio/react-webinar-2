import React, { useCallback, useState } from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import plural from "plural-ru";
import "./style.css";
import Button from "../button";

function Item(props) {
  const cn = bem("Item");
  //
  // // Счётчик выделений
  // const [count, setCount] = useState(0);
  //
  // const callbacks = {
  //
  //   onClick: useCallback(() => {
  //     props.onSelect(props.item.code);
  //     if (!props.item.selected) {
  //       setCount(count + 1);
  //     }
  //   }, [props.onSelect, props.item, setCount, count]),
  //
  //   onDelete: useCallback((e) => {
  //     e.stopPropagation();
  //     props.onDelete(props.item.code)
  //   }, [props.onDelete,  props.item])
  // };

  return (
    <div className={cn()}>
      <div className={cn("number")}>{props.item.code}</div>
      <div className={cn("title")}>{props.item.title}</div>
      <div className={cn("actions")}>
        <div className={cn("actions--price")}>
          <div>{props.item.price} </div>
          <div>₽</div>
        </div>
        <Button>Добавить</Button>
      </div>
    </div>
  );
}

// Item.propTypes = {
//   item: propTypes.object.isRequired,
//   onSelect: propTypes.func.isRequired,
//   onDeleted: propTypes.func.isRequired
// }
//
// Item.defaultProps = {
//   onSelect: () => {},
//   onDeleted: () => {}
// }

export default React.memo(Item);

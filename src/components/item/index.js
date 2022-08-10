import React from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function Item(props) {
  const cn = bem("Item");

  return (
    <div className={cn()}>
      <div className={cn("number")}>{props.item.code}</div>
      <div className={cn("title")}>
        <p> {props.item.title}</p>
        <div className={cn("info-wrapper")}>
          {" "}
          <p className={"Item-price"}>
            {props.item.price.toLocaleString("ru-RU")}
          </p>
        </div>
      </div>
      <div className={cn("actions")}>
        <button onClick={() => props.onAdd(props.item.code)}>Добавить</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  onAddItem: propTypes.func.isRequired,
};

Item.defaultProps = {
  onAddItem: () => {},
};

export default React.memo(Item);

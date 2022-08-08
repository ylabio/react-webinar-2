import React from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function Item(props) {
  const cn = bem("Item");
  const handlerClick = () => {
    props.handlerClick(props.item);
  };
  return (
    <div className={cn()}>
      <div className={cn("number")}>{props.item.code}</div>
      <div className={cn("title")}>{props.item.title}</div>
      <div className={cn("price")}>{props.item.price} &#8381;</div>

      {props.item.amount ? (
        <div className={cn("amount")}>{props.item.amount} шт.</div>
      ) : (
        ""
      )}

      <div className={cn("actions")}>
        <button onClick={handlerClick}>{props.textButton}</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  onDelete: propTypes.func.isRequired,
  handlerClick: propTypes.func.isRequired,
  textButton: propTypes.string,
};

Item.defaultProps = {
  onDelete: () => {},
  handlerClick: () => {},
  textButton: "Кнопка",
  item: null,
};

export default React.memo(Item);

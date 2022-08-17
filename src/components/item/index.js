import React, { useCallback } from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import numberFormat from "../../utils/numberFormat";
import { Link } from "react-router-dom";
import "./style.css";

function Item(props) {
  const cn = bem("Item");

  const callbacks = {
    onAdd: useCallback(
      (e) => props.onAdd(props.item._id),
      [props.onAdd, props.item]
    ),
  };

  return (
    <div className={cn()}>
      <Link
        to={{ pathname: props.pathname, hash: props.item._id }}
        className={cn("title")}
      >
        {props.item.title}
      </Link>
      <div className={cn("right")}>
        <div className={cn("price")}>{numberFormat(props.item.price)} ₽</div>
        <button onClick={callbacks.onAdd}>{props.lang.add}</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  onRemove: propTypes.func,
  lang: propTypes.object.isRequired,
  onAdd: propTypes.func.isRequired,
  pathname: propTypes.string,
};

Item.defaultProps = {
  onAdd: () => {},
  pathname: "",
};

export default React.memo(Item);

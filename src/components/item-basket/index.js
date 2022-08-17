import React, { useCallback } from "react";
import propTypes from "prop-types";
import numberFormat from "../../utils/numberFormat";
import { cn as bem } from "@bem-react/classname";
import "./styles.css";
import { Link } from "react-router-dom";

function ItemBasket(props) {
  const cn = bem("ItemBasket");

  const callbacks = {
    onRemove: useCallback(
      (e) => props.onRemove(props.item._id),
      [props.onRemove, props.item]
    ),
  };

  return (
    <div className={cn()}>
      <div className={cn("title")}>
        <Link to={props.url} onClick={props.onClose}>
          <p>{props.item.title}</p>
        </Link>
      </div>
      <div className={cn("right")}>
        <div className={cn("cell")}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn("cell")}>
          {numberFormat(props.item.amount || 0)} шт
        </div>
        <div className={cn("cell")}>
          <button onClick={callbacks.onRemove}>Удалить</button>
        </div>
      </div>
    </div>
  );
}

ItemBasket.propTypes = {
  item: propTypes.object.isRequired,
  onRemove: propTypes.func,
};

ItemBasket.defaultProps = {};

export default React.memo(ItemBasket);

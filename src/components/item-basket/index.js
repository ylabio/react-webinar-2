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
      <Link
        className={cn("title")}
        to={{ pathname: props.pathname, hash: props.item._id }}
        onClick={props.onClose}
      >
        {props.item.title}
      </Link>
      <div className={cn("right")}>
        <div className={cn("cell")}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn("cell")}>
          {numberFormat(props.item.amount || 0)} {props.lang.basket.psc}
        </div>
        <div className={cn("cell")}>
          <button onClick={callbacks.onRemove}>
            {props.lang.buttons.delete}
          </button>
        </div>
      </div>
    </div>
  );
}

ItemBasket.propTypes = {
  item: propTypes.object.isRequired,
  onRemove: propTypes.func,
  lang: propTypes.object.isRequired,
  onClose: propTypes.func.isRequired,
  pathname: propTypes.string,
};

ItemBasket.defaultProps = {
  pathname: "",
};

export default React.memo(ItemBasket);

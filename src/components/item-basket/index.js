import React, { useCallback } from "react";
import propTypes from "prop-types";
import numberFormat from "../../utils/number-format";
import { cn as bem } from "@bem-react/classname";
import "./styles.css";
import { Link } from "react-router-dom";
import url from "../../configs/url.json";

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
      {/*<div className={cn('id')}>{props.item._id}</div>*/}
      <Link
        to={`${url.BASE_CATALOG_URL}/${props.item._id}`}
        className={cn("title")}
        onClick={props.onClose}
      >
        {props.item.title}
      </Link>
      <div className={cn("right")}>
        <div className={cn("cell")}>{numberFormat(props.item.price)} ₽</div>
        <div className={cn("cell")}>
          {numberFormat(props.item.amount || 0)} {props.translate.basket.amount}
        </div>
        <div className={cn("cell")}>
          <button onClick={callbacks.onRemove}>
            {props.translate.basket.delete}
          </button>
        </div>
      </div>
    </div>
  );
}

ItemBasket.propTypes = {
  item: propTypes.object.isRequired,
  onRemove: propTypes.func,
  translate: propTypes.object.isRequired,
};

ItemBasket.defaultProps = {};

export default React.memo(ItemBasket);

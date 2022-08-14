import React, { useCallback } from "react";
import propTypes from "prop-types";
import numberFormat from "../../utils/numberFormat";
import { cn as bem } from "@bem-react/classname";
import "./styles.css";
import { Link } from "react-router-dom";
import useStore from "../../utils/use-store";

function ItemBasket(props) {
  const cn = bem("ItemBasket");

  const store = useStore();

  const callbacks = {
    onRemove: useCallback(
      (e) => props.onRemove(props.item._id),
      [props.onRemove, props.item]
    ),
    onClose: useCallback(() => {
      store.get("modals").close();
    }, []),
  };

  return (
    <div className={cn()}>
      <Link
        className={cn("title")}
        to={`/product/${props.item._id}`}
        onClick={callbacks.onClose}
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
};

ItemBasket.defaultProps = {};

export default React.memo(ItemBasket);

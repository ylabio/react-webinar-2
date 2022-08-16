import React, { useCallback } from "react";
import propTypes from "prop-types";
import numberFormat from "../../utils/number-format";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import { Link } from "react-router-dom";

function ItemBasket({ item, onRemove, onClose, productPageLink }) {
  const cn = bem("ItemBasket");

  const callbacks = {
    onRemove: useCallback((e) => onRemove(item._id), [onRemove, item]),
    onClose: useCallback((e) => onClose(), []),
  };

  return (
    <div className={cn()}>
      <Link
        to={productPageLink}
        className={cn("title")}
        onClick={callbacks.onClose}
      >
        {item.title}
      </Link>
      <div className={cn("right")}>
        <div className={cn("cell")}>{numberFormat(item.price)} ₽</div>
        <div className={cn("cell")}>{numberFormat(item.amount || 0)} шт</div>
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
  onClose: propTypes.func,
  productPageLink: propTypes.string,
};

ItemBasket.defaultProps = {
  onRemove: () => {},
  onClose: () => {},
  productPageLink: "",
};

export default React.memo(ItemBasket);

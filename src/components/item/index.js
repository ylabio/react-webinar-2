import React, { useCallback } from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import numberFormat from "../../utils/number-format";
import { Link } from "react-router-dom";
import "./style.css";

function Item({ item, onAdd, productPageLink }) {
  const cn = bem("Item");

  const callbacks = {
    onAdd: useCallback((e) => onAdd(item._id), [onAdd, item]),
  };

  return (
    <div className={cn()}>
      <Link to={productPageLink} className={cn("title")}>
        {item.title}
      </Link>
      <div className={cn("right")}>
        <div className={cn("price")}>{numberFormat(item.price)} ₽</div>
        <button onClick={callbacks.onAdd}>Добавить</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  onAdd: propTypes.func,
  productPageLink: propTypes.string,
};

Item.defaultProps = {
  onAdd: () => {},
  productPageLink: "",
};

export default React.memo(Item);

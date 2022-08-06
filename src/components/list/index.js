import React from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import Item from "../item";
import "./style.css";

function List({ items, currency, onItemAddedToCart, onItemDeletedFromCart }) {
  const cn = bem("List");

  return (
    <div className={cn()}>
      {items.map((item) => (
        <div key={item.code} className={cn("item")}>
          <Item
            item={item}
            currency={currency}
            onAddToCart={onItemAddedToCart}
            onDeleteFromCart={onItemDeletedFromCart}
          />
        </div>
      ))}
    </div>
  );
}

List.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
  currency: propTypes.string.isRequired,
  onItemAddedToCart: propTypes.func,
  onDeleteFromCart: propTypes.func,
};

List.defaultProps = {
  items: [],
  currency: "",
  onItemAddedToCart: () => {},
  onDeleteFromCart: () => {},
};

export default React.memo(List);

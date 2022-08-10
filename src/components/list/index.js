// @ts-nocheck
import React from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import Item from "../item";
import "./style.css";

function List({ addItemsToBasket, items }) {
  const cn = bem("List");

  return (
    <div className={cn()}>
      {items.map((item) => (
        <div key={item.code} className={cn("item")}>
          <Item addItemsToBasket={addItemsToBasket} item={item} />
        </div>
      ))}
    </div>
  );
}

List.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
  addItemsToBasket: propTypes.func.isRequired,
};

export default React.memo(List);

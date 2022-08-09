import React from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import Item from "../item";
import "./style.css";

function List(props) {
  const cn = bem("List");

  return (
    <div className={cn()}>
      {props.items.map((item) => (
        <div key={item.code} className={cn("item")}>
          <Item
            isMainContent={props.isMainContent}
            item={item}
            onAddItemToCart={props.onAddItemToCart}
            onDelete={props.onItemDelete}
          />
        </div>
      ))}
    </div>
  );
}

List.propTypes = {
  isMainContent: propTypes.any,
  items: propTypes.arrayOf(propTypes.object).isRequired,
  onItemDelete: propTypes.func.isRequired,
  onAddItemToCart: propTypes.func.isRequired,
};

List.defaultProps = {
  items: [],
  onItemDelete: () => {},
  onAddItemToCart: () => {},
};

export default React.memo(List);

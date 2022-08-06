import React from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import Item from "../item";
import "./style.css";

function List(props) {
  const cn = bem("List");

  return (
    <div className={cn()}>
      {props.items.map((item, index) => (
        <div key={item.code} className={cn("item")}>
          <Item
            index={index}
            item={item}
            onAddItem={props.onAddItem}
            onDeleteItem={props.onDeleteItem}
          />
        </div>
      ))}
    </div>
  );
}

List.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
  onItemSelect: propTypes.func,
  onAddItem: propTypes.func,
  onDeleteItem: propTypes.func,
};

List.defaultProps = {
  items: [],
  onItemSelect: () => {},
  onAddItem: () => {},
  onDeleteItem: () => {},
};

export default React.memo(List);

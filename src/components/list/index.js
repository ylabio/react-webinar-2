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
          <Item item={item} index={index} onAdd={props.onItemAdd} />
        </div>
      ))}
    </div>
  );
}

List.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
  onItemSelect: propTypes.func,
  onItemAdd: propTypes.func,
};

List.defaultProps = {
  items: [],
  onItemSelect: () => {},
  onItemAdd: () => {},
};

export default React.memo(List);

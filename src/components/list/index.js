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
          <Item index={index} item={item} onAddItem={props.onAddItem} />
        </div>
      ))}
    </div>
  );
}

List.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
  onAddItem: propTypes.func,
};

List.defaultProps = {
  items: [],
  onAddItem: () => {},
};

export default React.memo(List);

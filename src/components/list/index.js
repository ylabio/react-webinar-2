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
            item={item}
            handlerClick={props.handlerClick}
            textButton={props.textButton}
          />
        </div>
      ))}
    </div>
  );
}

List.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
  onAddQuantity: propTypes.func,
  textButton: propTypes.string,
};

List.defaultProps = {
  items: [],
};

export default React.memo(List);

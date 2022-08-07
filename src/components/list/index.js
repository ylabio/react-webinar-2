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
            butAssign={props.butAssign ? props.butAssign : "Добавить"}
            onCart={props.onCart}
          />
        </div>
      ))}
    </div>
  );
}

List.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
  butAssign: propTypes.string,
  onCart: propTypes.func.isRequired,
};

List.defaultProps = {
  items: [],
  onCart: () => {},
};

export default React.memo(List);

import React from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import Item from "../item";
import "./style.css";

function List({items, buttonAssign, onCart}) {
  const cn = bem("List");

  return (
    <div className={cn()}>
      {items.map((item) => (
        <div key={item.code} className={cn("item")}>
          <Item
            item={item}
            buttonAssign={buttonAssign ? buttonAssign : "Добавить"}
            onCart={onCart}
          />
        </div>
      ))}
    </div>
  );
}

List.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
  buttonAssign: propTypes.string,
  onCart: propTypes.func.isRequired,
};

List.defaultProps = {
  buttonAssign: "",
};

export default React.memo(List);

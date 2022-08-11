import React from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import Item from "../item";
import "./style.css";

function List({ items, buttonLabel, onButtonClick }) {
  const cn = bem("List");

  return (
    <div className={cn()}>
      {items.map((item) => (
        <div key={item.code} className={cn("item")}>
          <Item
            item={item}
            onButtonClick={onButtonClick}
            buttonLabel={buttonLabel}
          />
        </div>
      ))}
    </div>
  );
}

List.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
  buttonLabel: propTypes.string.isRequired,
  onButtonClick: propTypes.func.isRequired,
};

export default React.memo(List);

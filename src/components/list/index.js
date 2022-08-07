import React, { createElement, memo } from "react";
import propTypes from "prop-types";
import "./style.css";

function List(props) {
  const [component, control] = props.itemsComponent;

  return (
    <div className="List">
      {props.itemsData.map((item, index) => (
        <div key={item.code} className="List__item">
          {createElement(component, {
            item,
            control,
            order: index + 1,
          })}
        </div>
      ))}
    </div>
  );
}

List.propTypes = {
  itemsData: propTypes.arrayOf(propTypes.object).isRequired,
  itemComponent: propTypes.arrayOf(propTypes.any).isRequired,
};

List.defaultProps = {
  itemsData: [],
  itemComponent: [],
};

export default memo(List);

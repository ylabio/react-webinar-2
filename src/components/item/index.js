import React, { createElement, memo } from "react";
import propTypes from "prop-types";
import "./style.css";

function Item(props) {
  const [component, label, callbacks] = props.control;
  return (
    <div className="Item">
      <div className="Item__number">{props.order}</div>
      <div className="Item__title">{props.item.title}</div>
      <div className="Item__price">{`${props.item.price} ₽`}</div>
      {props.item.amount && (
        <div className="Item__unit">{`${props.item.amount} шт`}</div>
      )}
      {props.control && (
        <div className="Item__actions">
          {createElement(component, {
            onClick: callbacks,
            label,
            args: [props.item.code],
          })}
        </div>
      )}
    </div>
  );
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  control: propTypes.arrayOf(propTypes.any),
};

export default memo(Item);

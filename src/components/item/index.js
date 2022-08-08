import React, { createElement, memo } from "react";
import propTypes from "prop-types";
import { getFormatedPrice } from "../../utils";
import "./style.css";

function Item(props) {
  const [component, label, callbacks] = props.control;
  const { title, price, amount, code } = props.item;

  return (
    <div className="Item">
      <div className="Item__number">{props.order}</div>
      <div className="Item__title">{title}</div>
      <div className="Item__price">{`${getFormatedPrice(price)}`}</div>
      {amount && <div className="Item__unit">{`${amount} шт`}</div>}
      {props.control && (
        <div className="Item__actions">
          {createElement(component, {
            onClick: callbacks,
            label,
            args: [code],
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

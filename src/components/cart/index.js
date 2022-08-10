import React from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import Item from "../item";
import "./style.css";

function Cart({ buyState, itemClick, allPrice }) {
  const cn = bem("Cart");

  return (
    <>
      {buyState.length ? (
        buyState.map((item, index) => (
          <div key={index} className={cn("item")}>
            <Item item={item} itemClick={itemClick} />
          </div>
        ))
      ) : (
        <div className={cn("none")}>
          <b>пусто</b>
        </div>
      )}
      <div className={cn("end")}>
        <b>Итого</b>
        <b>{buyState.length && allPrice.toLocaleString("ru-RU")} ₽</b>
      </div>
    </>
  );
}

Cart.propTypes = {
  itemClick: propTypes.func,
  buyState: propTypes.array,
  allPrice: propTypes.number,
};

Cart.defaultProps = {
  itemClick: () => {},
  buyState: [],
  allPrice: 0,
};

export default React.memo(Cart);

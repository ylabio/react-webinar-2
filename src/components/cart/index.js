import React from "react";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import propTypes from "prop-types";
import List from "../list";

function Cart({ cart, cartAmount, onClose, deleteItem }) {
  const cn = bem("Cart");

  return (
    <div className={cn("wrapper")}>
      <div className={cn()}>
        <div className={cn("head")}>
          <h1>Корзина</h1>
          <button onClick={onClose}>Закрыть</button>
        </div>
        {cart.length ? (
          <>
            <List items={cart} onButtonClick={deleteItem} inCart />{" "}
            <div className={cn("total")}>
              <span className={cn("total-title")}>Итого</span>
              <span className={cn("total-price")}>{cartAmount.toLocaleString("ru")} ₽</span>
            </div>
          </>
        ) : (
          <div className={cn("empty-title")}>
            Пока что тут пусто... {String.fromCodePoint(0x1f6d2)}
          </div>
        )}
      </div>
    </div>
  );
}

Cart.propTypes = {
  cart: propTypes.arrayOf(propTypes.object).isRequired,
  cartAmount: propTypes.number.isRequired,
  onClose: propTypes.func.isRequired,
  deleteItem: propTypes.func.isRequired,
};

Cart.defaultProps = {
  cart: [],
  cartAmount: 0,
  onClose: () => {},
  deleteItem: () => {},
};

export default React.memo(Cart);

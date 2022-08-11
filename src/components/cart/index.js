import Layout from "../layout";
import React from "react";
import propTypes from "prop-types";
import CartItem from "../cart-item";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function Cart({ items, onItemDelete, onIsShow, countCartItems, sumCart }) {
  const cn = bem("Cart");
  return (
    <>
      <div className={cn()}>
        <div className={cn("head")}>
          <h1>Корзина</h1>
          <button className={cn("button")} onClick={onIsShow}>
            Закрыть
          </button>
        </div>
        <div>
          {items.map((item) => (
            <div key={item.code}>
              <CartItem item={item} onDelete={onItemDelete} />
            </div>
          ))}
        </div>
        <div className={countCartItems > 0 ? cn("price") : cn("price-clear")}>
          {countCartItems === 0 && <h4>Ваша корзина пуста</h4>}
          {countCartItems > 0 && (
            <h4>
              Итого{" "}
              {sumCart.toLocaleString("ru-RU", {
                style: "currency",
                currency: "RUB",
                minimumFractionDigits: 0,
              })}
            </h4>
          )}
        </div>
      </div>
    </>
  );
}

Cart.propTypes = {
  item: propTypes.object.isRequired,
  onItemDelete: propTypes.func,
  onIsShow: propTypes.func,
  countCartItems: propTypes.number.isRequired,
  sumCart: propTypes.number.isRequired,
};

Cart.defaultProps = {
  onItemDelete: () => {},
  onIsShow: () => {},
};

export default React.memo(Cart);

import React from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import List from "../list";

function CartModal({
  cart,
  cartTotal,
  currency,
  closeCartModal,
  onItemDeletedFromCart,
}) {
  const cn = bem("Cart_modal");

  return (
    <div className={cn("shadow-box")} onClick={closeCartModal}>
      <div className={cn("window")} onClick={(e) => e.stopPropagation()}>
        <div className={cn("header")}>
          <h2>Корзина</h2>
          <button onClick={closeCartModal}>Закрыть</button>
        </div>
        {cart.length ? (
          <div>
            <List
              items={cart}
              currency={currency}
              onItemDeletedFromCart={onItemDeletedFromCart}
            />
            <div className={cn("total")}>
              <span>Итого</span>
              <span>{cartTotal.toLocaleString("ru-RU") + " " + currency}</span>
            </div>
          </div>
        ) : (
          <p className={cn("empty")}>Ваша корзина пуста.</p>
        )}
      </div>
    </div>
  );
}

CartModal.propTypes = {
  cart: propTypes.arrayOf(propTypes.object).isRequired,
  cartTotal: propTypes.number.isRequired,
  currency: propTypes.string.isRequired,
  closeCartModal: propTypes.func.isRequired,
  onItemDeletedFromCart: propTypes.func.isRequired,
};

CartModal.defaultProps = {
  cart: [],
  cartTotal: "",
  currency: "",
  closeCartModal: () => {},
  onItemDeletedFromCart: () => {},
};

export default React.memo(CartModal);

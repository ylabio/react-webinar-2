import React, { useEffect, useState } from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import plural from "plural-ru";
import "./style.css";
import CartModal from "../cart-modal";

function CartPreview({ cart, currency, onItemDeletedFromCart }) {
  const cn = bem("Cart_preview");

  const [cartTotal, setCartTotal] = useState(0);
  const [modalCartOpen, setModalCartOpen] = useState(false);

  const modalHandler = () => {
    setModalCartOpen((condition) => !condition);
  };

  useEffect(() => {
    setCartTotal(
      cart.reduce((acc, item) => {
        return acc + item.price * item.amount;
      }, 0)
    );
  }, [cart]);

  return (
    <div className={cn()}>
      <div>В корзине:</div>
      {cart.length ? (
        <div className={cn("total")}>
          {cart.length} {plural(cart.length, "товар", "товара", "товаров")}
          {" / "}
          {cartTotal.toLocaleString("ru-RU")} {currency}
        </div>
      ) : (
        <div className={cn("total")}>пусто</div>
      )}
      {modalCartOpen && (
        <CartModal
          cart={cart}
          cartTotal={cartTotal}
          currency={currency}
          closeCartModal={modalHandler}
          onItemDeletedFromCart={onItemDeletedFromCart}
        />
      )}
      <div className={cn("actions")}>
        <button onClick={modalHandler}>Перейти</button>
      </div>
    </div>
  );
}

CartPreview.propTypes = {
  onItemDeletedFromCart: propTypes.func.isRequired,
  cart: propTypes.arrayOf(propTypes.object).isRequired,
  currency: propTypes.string.isRequired,
};

CartPreview.defaultProps = {
  cart: [],
  currency: "",
  onItemDeletedFromCart: () => {},
};

export default React.memo(CartPreview);

import React from "react";
import propTypes from "prop-types";
import "./style.css";
import { calcPrice } from "../../utils";

function CartTotal({ cartItems }) {
  return (
    <>
      {cartItems.length > 0 ? (
        <div className="total-block">
          <div>Итого</div>
          <div>{calcPrice(cartItems)} ₽</div>
        </div>
      ) : (
        <div className="cart-empty">Корзина пуста</div>
      )}
    </>
  );
}

CartTotal.propTypes = {
  cartItems: propTypes.arrayOf(propTypes.object).isRequired,
};

CartTotal.defaultProps = {
  cartItems: [],
};

export default React.memo(CartTotal);
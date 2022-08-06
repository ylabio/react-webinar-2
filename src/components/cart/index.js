import React from "react";
import propTypes from "prop-types";
import { CartHead } from "../cart-head";
import { CartTotal } from "../cart-total";
import Layout from "../layout";
import List from "../list";
import "./style.css";

export function Cart({ cartItems, onShowCart, deleteItemToCart }) {
  return (
    <div className="modalBackground">
      <div className="modalWindow">
        <Layout head={<CartHead onClick={onShowCart} />}>
          <List items={cartItems} text="Удалить" onClick={deleteItemToCart} />
          <CartTotal cartItems={cartItems} />
        </Layout>
      </div>
    </div>
  );
}

Cart.propTypes = {
  cartItems: propTypes.arrayOf(propTypes.object).isRequired,
  onShowCart: propTypes.func.isRequired,
  deleteItemToCart: propTypes.func.isRequired,
};

Cart.defaultProps = {
  cartItems: [],
  onShowCart: () => {}, // Значение по умолчанию - функция-заглушка
  deleteItemToCart: () => {},
};

import React from "react";
import "./style.css";
import propTypes from "prop-types";
import Modal from "../modal";
import List from "../list";
import CartItem from "../cart-item";

const Cart = ({ itemsInCart, totalPrice, closeModal, removeItem }) => {
  return (
    <Modal
      top={
        <>
          <h1>Корзина</h1>
          <button onClick={closeModal}>Закрыть</button>
        </>
      }
      footer={
        <>
          <div>Итого:</div>
          <div>{totalPrice} ₽</div>
        </>
      }
      listArray={
        <List
          items={itemsInCart}
          component={(item) => (
            <CartItem
              key={item.code}
              item={item}
              code={item.code}
              removeItem={removeItem}
            />
          )}
        />
      }
    />
  );
};

Cart.propTypes = {
  cartItems: propTypes.arrayOf(propTypes.object).isRequired,
  totalPrice: propTypes.number.isRequired,
  closeModal: propTypes.func.isRequired,
  removeItem: propTypes.func.isRequired,
};

export default React.memo(Cart);

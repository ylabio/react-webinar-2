import React from "react";
import CartItem from "../cart-item";
import propTypes from "prop-types";

const CartList = ({ cartItems, removeItem }) => {
  return (
    <div>
      {cartItems.map((item) => {
        return (
          <CartItem
            key={item.code}
            item={item}
            code={item.code}
            removeItem={removeItem}
          />
        );
      })}
    </div>
  );
};

CartList.propTypes = {
  cartItems: propTypes.arrayOf(propTypes.object).isRequired,
  removeItem: propTypes.func.isRequired,
};

export default CartList;

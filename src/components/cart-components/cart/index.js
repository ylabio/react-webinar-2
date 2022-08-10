import React from "react";
import propTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import List from "../../primitives/list";
import CartTotal from "../cart-total";
import ItemCart from "../item-cart";

function Cart({ cart, currency, cartTotalCost, onItemDeletedFromCart }) {
  const cn = bem("Cart");

  return (
    <div className={cn("wrapper")}>
      <List items={cart}>
        {(item) => (
          <li key={item.code}>
            <ItemCart
              item={item}
              currency={currency}
              onDeleteFromCart={onItemDeletedFromCart}
            />
          </li>
        )}
      </List>
      <CartTotal cartTotalCost={cartTotalCost} currency={currency} />
    </div>
  );
}

Cart.propTypes = {
  cart: propTypes.array.isRequired,
  currency: propTypes.string.isRequired,
  cartTotalCost: propTypes.number.isRequired,
  onItemDeletedFromCart: propTypes.func.isRequired,
};

export default React.memo(Cart);

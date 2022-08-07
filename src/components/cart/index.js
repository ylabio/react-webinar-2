import React from 'react';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import CartList from '../cart-list';

function Cart({ cartItems, onDeleteItemsFromCart }) {
  const cn = bem('Cart');

  return (
    <div className={cn()}>
      <CartList
        cartItems={cartItems}
        onDeleteItemsFromCart={onDeleteItemsFromCart}
      />
    </div>
  );
}

Cart.propTypes = {
  cartItems: propTypes.array.isRequired,
  onDeleteItemsFromCart: propTypes.func.isRequired,
};

Cart.defaultProps = {
  onDeleteItemsFromCart: () => {},
};

export default React.memo(Cart);

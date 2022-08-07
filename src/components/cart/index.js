import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import plural from 'plural-ru';
import './style.css';
import Item from '../item';
import CartList from '../cart-list';
import cartItem from '../cart-item';

function Cart({cartItems, onDeleteItemsFromCart}) {
  const cn = bem('Cart');
  

  return (
    <div className={cn()}>
      <CartList cartItems={cartItems} onDeleteItemsFromCart={onDeleteItemsFromCart} />
    </div>
  );
}

export default Cart;

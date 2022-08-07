import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import CartItem from '../cart-item';

function CartList({cartItems, onDeleteItemsFromCart}) {
  const cn = bem('CartList');
console.log({cartItems, onDeleteItemsFromCart})
  return (
    <div className={cn()}>
      {cartItems.map(item => (
        <div key={item.code} className={cn('item')}>
          <CartItem
            item={item}       
            onDelete={onDeleteItemsFromCart}            
          />
        </div>
      ))}
    </div>
  );
}

export default React.memo(CartList);

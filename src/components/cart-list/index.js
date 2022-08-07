import React, { useCallback } from 'react';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import CartItem from '../cart-item';

function CartList({ cartItems, onDeleteItemsFromCart }) {
  const cn = bem('CartList');

  return (
    <div className={cn()}>
      {cartItems.length !== 0 ? (
        cartItems.map(item => (
          <div key={item.code} className={cn('item')}>
            <CartItem item={item} onDelete={onDeleteItemsFromCart} />
          </div>
        ))
      ) : (
        <div className={cn('text')}>В корзине пусто</div>
      )}
    </div>
  );
}

CartList.propTypes = {
  cartItems: propTypes.array.isRequired,
  onDelete: propTypes.func.isRequired,
};

CartList.defaultProps = {
  onDelete: () => {},
};

export default React.memo(CartList);

import React from 'react';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import CartList from '../cart-list';
import { currencyFormat } from '../../utils';

function Cart({ cartItems, onDeleteItemsFromCart, totalPrice }) {
  const cn = bem('Cart');
  const modifiedPrice = currencyFormat(totalPrice, 0);

  return (
    <div className={cn()}>
      <CartList
        cartItems={cartItems}
        onDeleteItemsFromCart={onDeleteItemsFromCart}
        totalPrice={totalPrice}
      />
      {cartItems.length !== 0 && (
        <div className={cn('total')}>
          <span className={cn('label')}>Итого</span>
          {modifiedPrice}
        </div>
      )}
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

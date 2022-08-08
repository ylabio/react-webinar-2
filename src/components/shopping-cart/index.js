import React from 'react';
import {cn as bem} from '@bem-react/classname';
import propTypes from 'prop-types';
import './style.css';
import List from '../list';
import {arrayToCart, currencySign as roubleSign} from '../../utils';

function ShoppingCart({cartItems, onRemoveItem}) {
  const resultSum = cartItems.length
    ? cartItems.map(item => item.price).reduce((acc, curr) => acc + curr, 0)
    : 0;

  const grouppedItemsWithAmount = arrayToCart(cartItems);

  const cn = bem('ShoppingCart');
  return (
    <div className={cn()}>
      <List items={grouppedItemsWithAmount} onAction={onRemoveItem} cartItem />
      <div className={cn('total')}>
        <span>Итого:</span>{' '}
        <span>
          {resultSum} {roubleSign}{' '}
        </span>
      </div>
    </div>
  );
}

ShoppingCart.propTypes = {
  cartItems: propTypes.array,
  onRemoveItem: propTypes.func
};

export default React.memo(ShoppingCart);

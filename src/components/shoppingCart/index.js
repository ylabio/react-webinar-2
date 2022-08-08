import React from 'react';
import List from '../list';
import {arrayToCart, currencySign as roubleSign} from '../../utils';

function ShoppingCart({cartItems}) {
  const resultSum = cartItems.length
    ? cartItems.map(item => item.price).reduce((acc, curr) => acc + curr, 0)
    : 0;

  const grouppedItemsWithAmount = arrayToCart(cartItems);
  return (
    <>
      <List items={grouppedItemsWithAmount} cartItem />
      <p>
        Итого: {resultSum} {roubleSign}{' '}
      </p>
    </>
  );
}

export default React.memo(ShoppingCart);

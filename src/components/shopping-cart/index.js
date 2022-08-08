import React from 'react';
import {cn as bem} from '@bem-react/classname';
import propTypes from 'prop-types';
import './style.css';
import List from '../list';
import {arrayToCart, currencySign as roubleSign} from '../../utils';

function ShoppingCart({cartItems, onRemoveItem, total}) {
  const cn = bem('ShoppingCart');
  return (
    <div className={cn()}>
      <List items={cartItems} onAction={onRemoveItem} cartItem />
      <div className={cn('total')}>
        <span>Итого:</span>{' '}
        <span>
          {total} {roubleSign}{' '}
        </span>
      </div>
    </div>
  );
}

ShoppingCart.propTypes = {
  cartItems: propTypes.array,
  total: propTypes.number,
  onRemoveItem: propTypes.func
};

export default React.memo(ShoppingCart);

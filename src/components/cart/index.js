import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import CartItem from '../cart-item';
import {getFormattedPrice} from '../../utils';
import getList from '../get-list';
import './style.css';

function Cart({cartItems, totalPrice, onItemRemove}) {
  const cn = bem('Cart');

  const callbacks = {
    onItemRemove: useCallback((code) => {
      onItemRemove(code);
    }, [onItemRemove]),
  };

  return (
    <div className={cn()}>
      {getList(CartItem, cartItems, callbacks.onItemRemove)}
      
      <div className={cn('result')}>
        <span className={cn('total')}>
          <b>Итого</b>
        </span>
        <span className={cn('price')}>
          <b>{getFormattedPrice(totalPrice)}</b>
        </span>
      </div>
    </div>
  )
}

Cart.propTypes = {
  cartItems: propTypes.arrayOf(propTypes.object).isRequired,
  totalPrice: propTypes.number.isRequired,
  onItemRemove: propTypes.func.isRequired,
}

export default React.memo(Cart);

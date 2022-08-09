import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import CartItem from '../cart-item';
import List from '../list';
import {getFormattedPrice} from '../../utils';
import './style.css';

function Cart(props) {
  const cn = bem('Cart');

  const callbacks = {
    onItemRemove: useCallback((code) => {
      props.onItemRemove(code);
    }, [props.onItemRemove]),
  };

  return (
    <div className={cn()}>
      <List>
        {props.cartItems.map((item) =>
          <CartItem
            cartItem={item}
            onItemRemove={callbacks.onItemRemove}
            key={item.code}
          />
        )}
      </List>

      <div className={cn('result')}>
        <span className={cn('total')}>
          <b>Итого</b>
        </span>
        <span className={cn('price')}>
          <b>{getFormattedPrice(props.totalPrice)}</b>
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

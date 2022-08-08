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
    onItemDelete: useCallback((code) => {
      props.onItemDelete(code);
    }, [props.onItemDelete]),
  };

  return (
    <div className={cn()}>
      <List>
        {props.cartItems.map((item, index) =>
          <CartItem
            cartItem={item}
            itemCount={index + 1}
            onItemDelete={callbacks.onItemDelete}
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
  onItemDelete: propTypes.func.isRequired,
}

export default React.memo(Cart);

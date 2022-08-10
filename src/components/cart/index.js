import React from 'react';
import {cn as bem} from "@bem-react/classname";
import propTypes from "prop-types";

import './style.css';

import CartItem from "../cart-item";
import {priceFormat} from "../../utils";

function Cart({cartItems, handleDeleteCartItem, totalPrice, totalCount}) {
  const cn = bem('Cart');
  
  return (
    <>
      <div className={cn('cartList')}>
        {cartItems.map(cartItem => <CartItem key={cartItem.code} cartItem={cartItem}
                                             handleDeleteCartItem={handleDeleteCartItem}/>)}
      </div>
      <div className={cn('footer')}>
        {totalCount > 0 ?
          <>
            <span className={cn('footer_text')}>Итого</span>
            <span className={cn('footer_price')}>{priceFormat(totalPrice)}₽</span>
          </>
          :
          <div className={cn('emptyCart')}> В корзине ничего нет :(</div>
        }
      </div>
    </>
  )
}

Cart.propTypes = {
  cartItem: propTypes.arrayOf(propTypes.object),
  totalPrice: propTypes.number,
  totalCount: propTypes.number,
  handleDeleteCartItem: propTypes.func
}

Cart.defaultProps = {
  cartItem: [],
  totalPrice: 0,
  totalCount: 0,
  handleDeleteCartItem: () => {
  },
}

export default React.memo(Cart);

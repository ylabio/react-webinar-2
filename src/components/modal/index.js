import React from 'react';
import {cn as bem} from "@bem-react/classname";
import propTypes from "prop-types";

import './style.css';

import CartItem from "../cart-item";
import {priceFormat} from "../../utils";

function Modal({cartItems, setIsModalActive, handleDeleteCartItem, totalPrice, totalCount}) {
  const cn = bem('CartModal');
  
  return (
    <div className={cn()} onClick={() => setIsModalActive(false)}>
      <div className={cn('content')} onClick={e => e.stopPropagation()}>
        <div className={cn('controls')}>
          <div className={cn('controls__title')}>Корзина</div>
          <div>
            <button onClick={() => setIsModalActive(false)}>Закрыть</button>
          </div>
        </div>
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
      </div>
    </div>
  )
}

Modal.propTypes = {
  cartItem: propTypes.arrayOf(propTypes.object),
  isModalActive: propTypes.bool,
  totalPrice: propTypes.number,
  totalCount: propTypes.number,
  setIsModalActive: propTypes.func,
  handleDeleteCartItem: propTypes.func
}

Modal.defaultProps = {
  cartItem: [],
  isModalActive: () => {
  },
  totalPrice: 0,
  totalCount: 0,
  setIsModalActive: () => {
  },
  handleDeleteCartItem: () => {
  },
}

export default React.memo(Modal);

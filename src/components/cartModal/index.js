import React from 'react';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import CartItem from "../cartItem";

function CartModal({cartItems, isModalActive, setIsModalActive, handleDeleteCartItem}) {
  const cn = bem('CartModal');
  
  return (
    <div className={isModalActive ? 'CartModal CartModal_active' : cn()} onClick={() => setIsModalActive(false)}>
      <div className={cn('content')} onClick={e => e.stopPropagation()}>
        <div className={cn('controls')}>
          <div className={cn('controls__title')}>Корзина</div>
          <div>
            <button onClick={() => setIsModalActive(false)}>Закрыть</button>
          </div>
        </div>
        <div className={cn('cartList')}>
          {cartItems.map(cartItem => <CartItem cartItem={cartItem} handleDeleteCartItem={handleDeleteCartItem}/>)}
        </div>
        <div className={cn('footer')}>
          <span className={cn('footer_text')}>Итого</span>
          <span className={cn('footer_price')}>{100}₽</span>
        </div>
      </div>
    </div>
  )
}

CartModal.propTypes = {}

CartModal.defaultProps = {}

export default CartModal;

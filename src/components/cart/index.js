import React from 'react';
import propTypes, { object } from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import List from '../list';

function Cart({setOpenCart, removeFromCart, cart, totalPrice}){
    const cn = bem('Cart');
  
    return (
      <div className={cn()}>
        <div className={cn('head')}>
          <h1>Корзина</h1>
          <button onClick={() => setOpenCart(false)}>Закрыть</button>
        </div>
        
        <List items={cart} action={removeFromCart}/>

        <div className={cn('total')}>
          <span>Итого</span>
          {totalPrice.toLocaleString('ru')} ₽
        </div>

      </div>
    )
  }
  
  Cart.propTypes = {
    cart: propTypes.arrayOf(propTypes.object).isRequired,
    setOpenCart: propTypes.func.isRequired,
    removeFromCart: propTypes.func.isRequired,
    totalPrice: propTypes.number.isRequired,
  }
  
  Cart.defaultProps = {
  }
  
  export default React.memo(Cart);
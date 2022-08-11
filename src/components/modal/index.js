import React from 'react';
import Cart from '../cart';
import { cn as bem } from "@bem-react/classname";
import './style.css';
import propTypes from "prop-types";
import CartFooter from '../cart-footer';

function Modal({ cartItems, onDelete, show, hide, totalPrice }) {
   const cn = bem('Modal');
   if (!show) {
      return null;
   }
   return (
      <div className={cn()}>
         <div className={cn('content')}>
            <div className={cn('head')}>
               <h1>Корзина</h1>
               <button onClick={hide}>Закрыть</button>
            </div>
            <div className={cn('body')}>
               <Cart items={cartItems} onItemDelete={onDelete} />
            </div>
            <div className={cn('footer')}>
               <CartFooter totalPrice={totalPrice} />
            </div>
         </div>

      </div>
   )
}

Modal.propTypes = {

}

Modal.defaultProps = {
   items: [],
   onItemDelete: () => { }
}

export default React.memo(Modal);
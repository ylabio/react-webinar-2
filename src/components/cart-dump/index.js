import React, { useEffect, useRef } from "react";
import {cn as bem} from "@bem-react/classname";
import Button from "../../shared/ui/button";
import CartItem from "../cart-item";
import { formatPrice } from "../../shared/utils";
import './style.css';
import propTypes from 'prop-types';
import List from "../list";

function CartDump({
  removeItemFromCart, 
  closeModal, 
  isCartOpen, 
  price,
  items,
}) {
  const modalRef = useRef();
  const cn = bem('CartDump');

  useEffect(() => {
    if (isCartOpen) {
      setTimeout(() => {
        modalRef.current.style.transform = 'translateY(0%)';
      }, 0)
    }

  }, [isCartOpen])

  return (
    <div 
      className={cn()} 
      onClick={(e) => e.stopPropagation()}
      ref={modalRef}
    >
      <header className={cn('header')}>
        <h2 className={cn('headerText')}>Корзина</h2>
          <Button 
            text='Закрыть'
            onClick={closeModal}
          />           
      </header>

      <div className={cn('divider')} />

      <main className={cn('goods', {open: isCartOpen})}>
        <List 
           items={items} 
           cb={removeItemFromCart}
           ListItem={CartItem}
           isModal={true}
        />       

        <div className={cn('total')}>
          <span>Итого</span>
          <span>{formatPrice(price) + ' ₽'}</span>
        </div>         
      </main> 
    </div>
  );
}

CartDump.propTypes = { 
  removeItemFromCart: propTypes.func.isRequired,
  closeModal: propTypes.func.isRequired, 
  isCartOpen: propTypes.bool.isRequired,
  price: propTypes.number,
  items: propTypes.array.isRequired,
};

CartDump.defaultProps = {
  removeItemFromCart: () => {},
  closeModal: () => {}, 
  isCartOpen: false,
  price: 0,
  items: [],
};

export default CartDump;
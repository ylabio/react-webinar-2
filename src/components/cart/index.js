import React from 'react';
import './style.css';
import {cn as bem} from '@bem-react/classname';
import propTypes from 'prop-types';
import List from '../list';
import CartItem from '../cart-item';
import Button from '../../shared/ui/button';
import { formatPrice } from '../../shared/utils';

function Cart({ 
  items, 
  removeItemFromCart, 
  closeModal, 
  price, 
  isCartOpen,
}) {
  const cn = bem('Cart');

  return (
    <div
      className={cn()} 
      onClick={(e) => e.stopPropagation()}
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
          isModal={true}
          ListItem={CartItem}
          cb={removeItemFromCart}
          items={items}
        />

        <div className={cn('total')}>
          <span>Итого</span>
          <span>{formatPrice(price) + ' ₽'}</span>
        </div>      
      </main>
    </div>
  );
}

Cart.propTypes = {
  items: propTypes.array.isRequired, 
  removeItemFromCart: propTypes.func.isRequired, 
  closeModal: propTypes.func.isRequired,
  price: propTypes.number.isRequired,
  isCartOpen: propTypes.bool.isRequired,
};

Cart.defaultProps = {};

export default Cart;


import React from 'react';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import Layout from '../layout';
import List from '../list';

function CartModal({ totalPrice, onCloseCart, cartItems, onItemDelete }) {
  const cn = bem('Cart');

  return (
    <div className={cn('bg')}>
      <Layout
        head={
          <div className={cn('head')}>
            <h1>Корзина</h1> <button onClick={onCloseCart}>Закрыть</button>
          </div>
        }
        className='cart'>
        <List items={cartItems} onItemDelete={onItemDelete} btnTitle='Удалить' />
        <span className={cn('total')}>
          <b>Итого</b>
          <b>{totalPrice}</b>
        </span>
      </Layout>
    </div>
  );
}

List.propTypes = {
  onItemDelete: propTypes.func,
};

List.defaultProps = {
  onItemDelete: () => {},
};

export default CartModal;

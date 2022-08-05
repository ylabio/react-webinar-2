import React, {useCallback, useState} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import CartItem from "../cart-item";
import {getTotalPrice, getFormattedPrice} from '../../utils';
import './style.css';

function Cart(props) {
  const cn = bem('Cart');

  const callbacks = {
    onClose: useCallback(() => {
      props.onClose();
    }, [props.onClose]),
    onItemDelete: useCallback((code) => {
      props.onItemDelete(code);
    }, [props.onItemDelete]),
  };

  return (
    <div className={cn('overlay')}>
      <div className='Cart'>
        <div className={cn('header')}>
          <h1>Корзина</h1>
          <button onClick={callbacks.onClose}>Закрыть</button>
        </div>
        <ul className={cn('list')}>
          {props.cartItems.length > 0 &&
            props.cartItems.map((item, index) =>
              <li key={item.code} className={cn('item')}>
                <CartItem
                  cartItem={item}
                  itemCount={index + 1}
                  onItemDelete={callbacks.onItemDelete}
                />
              </li>)}
        </ul>
        <div className={cn('result')}>
          <span className={cn('total')}>
            <b>Итого</b>
          </span>
          <span className={cn('price')}>
            <b>{getFormattedPrice(getTotalPrice(props.cartItems))}</b>
          </span>
        </div>
      </div>
    </div>
  )
}

Cart.propTypes = {
  cartItems: propTypes.arrayOf(propTypes.object).isRequired,
  onCartClose: propTypes.func.isRequired, // Обязательное свойство - функция
  onItemDelete: propTypes.func.isRequired
}

Cart.defaultProps = {
  cartItems: [],
  onCartClose: () => {}, // Значение по умолчанию - функция-заглушка
  onItemDelete: () => {}
}

export default React.memo(Cart);
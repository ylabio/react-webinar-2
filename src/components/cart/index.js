import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import List from '../list'
import './style.css';

function Cart(props) {
  const cn = bem('Cart');

  return (
    <div className='Overlay'>
      <div className={cn()}>
        <div className={cn('head')}>
          <h1>Корзина</h1>
          <button onClick={props.isCartOpened}>Закрыть</button>
        </div>
        <div className={cn('content')}>
          <List items={props.cartItems}
                onClickButton={props.onDeleteFromCart}
                onCart/>
            <div className={cn('content-info')}>
              {props.cartItems.length 
              ? <>
                  <b>Итого</b>
                  <b>{props.totalPrice.toLocaleString('ru')} ₽</b>
                </>
              : <h2>В корзине пусто</h2>}
            </div>
        </div>
      </div>
    </div>
  )
}

Cart.propTypes = {
  totalPrice: propTypes.number,
  cartItems: propTypes.arrayOf(propTypes.object).isRequired,
  isCartOpened: propTypes.func, // Обязательное свойство - функция
  onDeleteFromCart: propTypes.func.isRequired
}

Cart.defaultProps = {
  totalPrice: 0,
  cartItems: [],
  isCartOpened: () => {}, // Значение по умолчанию - функция-заглушка
  onDeleteFromCart: () => {}
}

export default React.memo(Cart);
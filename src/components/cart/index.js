import React from 'react';
import List from "../list";
import {getTotalPrice} from '../../utils.js';
import './style.css';

/**
 * Корзина товаров
 * @param props Передаваемые пропсы
 * @return {React.ReactElement} Виртуальные элементы React
 */
function Cart({cartItems, onCloseCart, isOpen, ...props}) {
  const classNames = isOpen ? 'Cart Cart--open' : 'Cart';

  return (
    <div className={classNames}>
      <div className='Cart-overlay' onClick={onCloseCart}></div>
      <div className='Cart-content'>
        <header className='Cart-header'>
          <h1 className='Cart-title'>Корзина</h1>
          <button className='Cart-close-btn'
                  onClick={onCloseCart}
          >
            Закрыть
          </button>
        </header>
        <List items={cartItems}
              {...props}
        />
        <div className='Cart-total'>
          <span className='Cart-total-title'>Итого</span> {getTotalPrice(cartItems).toLocaleString('ru-RU')} ₽
        </div>
      </div>
    </div>
  );
}

export default React.memo(Cart);

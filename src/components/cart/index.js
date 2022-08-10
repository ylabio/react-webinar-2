import React from 'react';
import propTypes from "prop-types";
import List from "../list";
import './style.css';

/**
 * Корзина товаров
 * @param props Передаваемые пропсы
 * @return {React.ReactElement} Виртуальные элементы React
 */
function Cart({cartItems, cartTotalPrice, ...props}) {
  return (
    <>
      <List items={cartItems}
            {...props}
      />
      <div className='Cart-total'>
        <span className='Cart-total-title'>Итого</span> {cartTotalPrice.toLocaleString('ru-RU')} ₽
      </div>
    </>
  );
}

Cart.propTypes = {
  cartItems: propTypes.arrayOf(propTypes.object).isRequired,
  cartTotalPrice: propTypes.number,
}

Cart.defaultProps = {
  cartTotalPrice: 0,
}

export default React.memo(Cart);

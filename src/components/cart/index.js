import React from 'react';
import propTypes from 'prop-types';
import List from '../list';
import {cn as bem} from '@bem-react/classname';
import './style.css';

/**
 * Корзина
 * @param props
 * @param {function} props.callback Ивент для кнопки
 * @param {function} props.onModalClose Ивент на закрытии модалки
 * @param {Object[]} props.shoppingCart Массив с товарами из корзины
 * @param {Number} props.totalPrice Общая цена товаров в корзине
 * @param {String} props.callbackName Надпись для кнопки
 * @return {React.ReactElement} Виртуальные элементы React
 */

function Cart(props) {
  const cn = bem('Cart');
  const {onModalClose, shoppingCart, callback, totalPrice, callbackName} = props;

  return (
    <div className={cn()}>
      <div className={cn('head')}>
        <h2>Корзина</h2>
        <button onClick={onModalClose}>Закрыть</button>
      </div>
      <List items={shoppingCart} callbackName={callbackName} callback={callback}/>
      <div className={cn('total', {empty: !shoppingCart.length})}>
        {shoppingCart.length ? <p className={cn('price')}> {totalPrice.toLocaleString('ru-RU')} ₽ </p> : 'Пусто'}
      </div>
    </div>
  )
}

Cart.propTypes = {
  shoppingCart: propTypes.arrayOf(propTypes.object).isRequired,
  onDeleteItem: propTypes.func,
  onModalClose: propTypes.func,
  callback: propTypes.func,
  totalPrice: propTypes.number.isRequired
};

Cart.defaultProps = {
  shoppingCart: [],
  totalPrice: 0
};

export default React.memo(Cart);
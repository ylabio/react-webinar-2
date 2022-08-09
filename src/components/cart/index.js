import React from 'react';
import propTypes from 'prop-types';
import List from '../list';
import {cn as bem} from '@bem-react/classname';
import './style.css';

/**
 * Корзина
 * @param props
 * @param {function} props.callback Ивент для кнопки
 * @param {Object[]} props.shoppingCart Массив с товарами из корзины
 * @param {Number} props.totalPrice Общая цена товаров в корзине
 * @param {String} props.callbackName Надпись для кнопки
 * @return {React.ReactElement} Виртуальные элементы React
 */

function Cart(props) {
  const cn = bem('Cart');
  const {shoppingCart, onDeleteItem, totalPrice, callbackName} = props;

  return (
    <div className={cn()}>
      <List items={shoppingCart} callbackName={callbackName} callback={onDeleteItem}/>
      <div className={cn('total', {empty: !shoppingCart.length})}>
        {shoppingCart.length ? <p className={cn('price')}> {totalPrice.toLocaleString('ru-RU')} ₽ </p> : <p className={cn('empty')}>Пусто</p>}
      </div>
    </div>
  )
}

Cart.propTypes = {
  shoppingCart: propTypes.arrayOf(propTypes.object).isRequired,
  onDeleteItem: propTypes.func.isRequired,
  totalPrice: propTypes.number.isRequired
};

Cart.defaultProps = {
}

export default React.memo(Cart);
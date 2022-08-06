import React from 'react';
import propTypes from 'prop-types';
import List from '../list';
import {cn as bem} from '@bem-react/classname';
import './style.css';

 /*
 * Корзина
 * @param items {arrayOf(object)} Массив объектов корзины
 * @param onDeleteItem {function} Функция удаления элемента из корзины
 * @param onCloseModal {function} Функция закрытия модального окна
 * @return {React.ReactElement} Виртуальные элементы React
 */
function Cart({items, onDeleteItem, onCloseModal, totalPrice}) {
  const cn = bem('Cart');

  return (
    <div className={cn()}>
      <div className={cn('head')}>
        <h2>Корзина</h2>
        <button onClick={onCloseModal}>Закрыть</button>
      </div>
      <List items={items} callback={{action: onDeleteItem, name: 'Удалить'}}/>
      <div className={cn('total', {empty: !items.length})}>
         {items.length ? <span className={cn('price')}>{totalPrice.toLocaleString('ru-RU')}</span> : 'Пусто'}
      </div>
    </div>
  )
};

Cart.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
  onDeleteItem: propTypes.func.isRequired,
  onCloseModal: propTypes.func.isRequired,
  totalPrice: propTypes.number.isRequired
};

Cart.defaultProps = {
  items: [],
  onDeleteItem: () => {},
  onCloseModal: () => {},
  totalPrice: 0
};

export default React.memo(Cart);

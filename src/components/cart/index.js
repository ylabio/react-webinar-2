import React, { useMemo } from 'react';
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

  const callbackButton = useMemo(() => ({action: onDeleteItem, name: 'Удалить'}),[])

  return (
    <div className={cn()}>
      <div className={cn('head')}>
        <h2>Корзина</h2>
        <button onClick={onCloseModal}>Закрыть</button>
      </div>
      <div className={cn('info')}>{items.length === 0 && 'Пусто'}</div>
      <List items={items} callback={callbackButton}/>
      <div className={cn('total', {active: items.length > 0})}>
         {!!items.length && totalPrice.toLocaleString('ru-RU')}
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

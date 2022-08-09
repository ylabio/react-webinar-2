import React, { useMemo } from 'react';
import propTypes from 'prop-types';
import List from '../list';
import CartItem from '../cart-item';
import { cn as bem } from '@bem-react/classname';
import './style.css';

/*
 * Корзина
 * @param items {arrayOf(object)} Массив объектов корзины
 * @param onDeleteItem {function} Функция удаления элемента из корзины
 * @param totalPrice {number} Общая стоимость товаров
 * @return {React.ReactElement} Виртуальные элементы React
 */
function Cart({ items, onDeleteItem, totalPrice }) {
  const cn = bem('Cart');

  const callbackButton = useMemo(
    () => ({ action: onDeleteItem, name: 'Удалить' }),
    []
  );

  return (
    <div className={cn()}>
      <div className={cn('info')}>{items.length === 0 && 'Пусто'}</div>
      <List items={items} callback={callbackButton} component={CartItem} />
      <div className={cn('total', { active: items.length > 0 })}>
        {items.length > 0 && totalPrice.toLocaleString('ru-RU')}
      </div>
    </div>
  );
}

Cart.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
  onDeleteItem: propTypes.func.isRequired,
  totalPrice: propTypes.number.isRequired,
};

Cart.defaultProps = {
  items: [],
  onDeleteItem: () => {},
  totalPrice: 0,
};

export default React.memo(Cart);

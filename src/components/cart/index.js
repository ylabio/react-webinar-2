import React, { useCallback } from 'react';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

import ModalWindow from '../modal-window';
import ListCart from '../lists/list-cart';

function Cart({ items, amountItemsInCart, onToggleCart, onDeleteItemFromCart }) {
  const cn = bem('Cart');
  const cnInfo = bem('info');

  const callbacks = {
    closeCart: useCallback(
      (flag) => {
        onToggleCart(!flag);
      },
      [onToggleCart]
    ),
  };

  return (
    <ModalWindow title="Корзина" closeModal={callbacks.closeCart}>
      {items.length ? (
        <ListCart items={items} listType="Cart" onDeleteItemFromCart={onDeleteItemFromCart} />
      ) : (
        <div className={cn('empty')}>В корзине нет товаров</div>
      )}

      <div className={cn('info', ['info'])}>
        Итого
        <span className={cnInfo('right')}>{`${amountItemsInCart.toLocaleString('ru-RU')} ₽`}</span>
      </div>
    </ModalWindow>
  );
}

Cart.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
  amountItemsInCart: propTypes.number,
  onToggleCart: propTypes.func.isRequired,
  onDeleteItemFromCart: propTypes.func.isRequired,
};

Cart.defaultProps = {
  amountItemsInCart: 0,
};

export default React.memo(Cart);

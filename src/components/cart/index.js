import React from 'react';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import Button from '../button';
import List from '../list';

function Cart({ items, cartPrice, onToggleCart, onDeleteItemFromCart }) {
  const cn = bem('Cart');
  const cnInfo = bem('info');

  return (
    <div className={cn()}>
      <div className={cn('content')}>
        <div className={cn('head')}>
          <span className={cn('title')}>Корзина</span>
          <Button className={cn('button')} onClick={() => onToggleCart(false)}>
            Закрыть
          </Button>
        </div>

        {items.length ? (
          <List items={items} listType="Cart" onDeleteItemFromCart={onDeleteItemFromCart} />
        ) : (
          <div className={cn('empty')}>В корзине нет товаров</div>
        )}

        <div className={cn('info', ['info'])}>
          Итого
          <span className={cnInfo('right')}>{`${cartPrice.toLocaleString('ru-RU')} ₽`}</span>
        </div>
      </div>
    </div>
  );
}

Cart.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
  cartPrice: propTypes.number,
  onToggleCart: propTypes.func.isRequired,
  onDeleteItemFromCart: propTypes.func.isRequired,
};

Cart.defaultProps = {
  cartPrice: 0,
};

export default React.memo(Cart);

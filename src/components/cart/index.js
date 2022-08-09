import React from 'react';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import { formatCurrency } from '../../utils';
import List from '../list';

function Cart({ items, price, onItemDelete }) {
  const cn = bem('Cart');
  return (
    <>
      {items.length > 0 ? (
        <>
          <List onItemDelete={onItemDelete} items={items} />
          <div className={cn()}>
            <div className={cn('total')}>Итого</div>
            <div>{formatCurrency(price)}</div>
          </div>
        </>
      ) : (
        <h2 className={cn('message')}>Корзина пуста!</h2>
      )}
    </>
  );
}

Cart.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
  price: propTypes.number.isRequired,
  onItemDelete: propTypes.func,
};

Cart.defaultProps = {
  onItemDelete: () => {},
};

export default React.memo(Cart);

import React from 'react';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import CartItem from '../cart-item';
import Item from '../item';
import './style.css';

function List({ items, onItemAdd, onItemDelete }) {
  const cn = bem('List');

  return (
    <div className={cn()}>
      {items.map((item) => {
        if (item.count) {
          return (
            <div key={item.code} className={cn('item')}>
              <CartItem item={item} onDelete={onItemDelete} />
            </div>
          );
        } else {
          return (
            <div key={item.code} className={cn('item')}>
              <Item item={item} onAdd={onItemAdd} />
            </div>
          );
        }
      })}
    </div>
  );
}

List.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
  onItemAdd: propTypes.func,
  onItemDelete: propTypes.func,
};

List.defaultProps = {
  onItemAdd: () => {},
  onItemDelete: () => {},
};

export default React.memo(List);

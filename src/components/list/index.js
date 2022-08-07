import React, { memo } from 'react';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import Item from '../item';
import './style.css';

function List({ items, onAddItemToCart }) {
  const cn = bem('List');

  return (
    <div className={cn()}>
      {items.map((item) => (
        <div key={item.code} className={cn('item')}>
          <Item item={item} onAddItemToCart={onAddItemToCart} />
        </div>
      ))}
    </div>
  );
}

List.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
  onAddItemToCart: propTypes.func,
};

List.defaultProps = {
  items: [],
  onAddItemToCart: () => {},
};

export default memo(List);

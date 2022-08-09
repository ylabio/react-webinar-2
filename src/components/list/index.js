import React, { memo } from 'react';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import Item from '../item';
import './style.css';
import SumModal from '../sum-modal';

function List({ items, onAddItemToCart, onDelete, activeCart, sumInCart }) {
  const cn = bem('List');

  return (
    <div className={cn()}>
      {items.map((item) => (
        <div key={item.code} className={cn('item')}>
          <Item
            item={item}
            onAddItemToCart={onAddItemToCart}
            onDelete={onDelete}
            activeCart={activeCart}
          />
        </div>
      ))}
      {activeCart && <SumModal sumInCart={sumInCart} />}
    </div>
  );
}

List.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
  onAddItemToCart: propTypes.func,
  onDelete: propTypes.func,
  activeCart: propTypes.bool,
  sumInCart: propTypes.number,
};

List.defaultProps = {
  items: [],
  onAddItemToCart: () => {},
  onDelete: () => {},
  activeCart: false,
};

export default memo(List);

import React from 'react';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import Item from '../item';
import './style.css';

function List(props) {
  const cn = bem('List');

  return (
    <div className={cn()}>
      {props.items.map((item) => (
        <div key={item.code} className={cn('item')}>
          <Item
            item={item}
            onAddToCart={props.onItemAddToCart}
            onDeleteFromCart={props.onItemDeleteFromCart}
          />
        </div>
      ))}
    </div>
  );
}

List.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
  onItemSelect: propTypes.func,
  onItemDelete: propTypes.func,
  onItemAddToCart: propTypes.func,
  onItemDeleteFromCart: propTypes.func,
};

List.defaultProps = {
  items: [],
  onItemSelect: () => {},
  onItemDelete: () => {},
  onItemAddToCart: () => {},
  onItemDeleteFromCart: () => {},
};

export default React.memo(List);

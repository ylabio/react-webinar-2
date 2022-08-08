import React from 'react';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import Item from '../item';
import './style.css';

function List(props) {
  const cn = bem('List');

  return (
    <div className={cn()}>
      {props.items.map((item, i) => (
        <div key={item.code} className={cn('item')}>
          {props.listType && props.listType === 'Cart' ? (
            <Item
              item={item}
              itemType={'Cart'}
              itemStackNumber={i + 1}
              onDeleteItemFromCart={props.onDeleteItemFromCart}
            />
          ) : (
            <Item item={item} onAddItemInCart={props.onAddItemInCart} />
          )}
        </div>
      ))}
    </div>
  );
}

List.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
  onAddItemInCart: propTypes.func,
  onDeleteItemFromCart: propTypes.func,
  listType: propTypes.string,
};

List.defaultProps = {
  onAddItemInCart: () => {},
  onDeleteItemFromCart: () => {},
};

export default React.memo(List);

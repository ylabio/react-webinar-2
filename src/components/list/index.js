import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import Item from '../item';
import './style.css';

function List(props) {
  const cn = bem('List');

  return (
    <div className={cn()}>
      {props.items.map(item => (
        <div key={item.code} className={cn('item')}>
          <Item
            items={props.items}
            item={item}
            onButtonClick={props.onAction}
            cartItem={props.cartItem}
          />
        </div>
      ))}
    </div>
  );
}

List.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
  onAction: propTypes.func,
  cartItem: propTypes.bool
};

List.defaultProps = {
  items: [],
  onAction: () => {},
  cartItem: false
};

export default React.memo(List);

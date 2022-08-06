import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import Item from "../item";
import './style.css';

function List(props) {
  const cn = bem('List');

  return (
    <div className={cn()}>{props.items.map(item =>
      <div key={item.code} className={cn('item')}>
        <Item item={item} 
              onDeleteFromCart={props.onDeleteFromCart} 
              onAddToCart={props.onAddToCart}
        />
      </div>
    )}
    </div>
  )
}

List.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
  onDeleteFromCart: propTypes.func,
  onAddToCart: propTypes.func,
}

List.defaultProps = {
  items: [],
  onDeleteFromCart: () => {},
  onAddToCart: () => {}
}

export default React.memo(List);

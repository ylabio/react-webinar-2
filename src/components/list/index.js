import React from 'react';
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

List.defaultProps = {
  items: [],
  onDeleteFromCart: () => {},
  onAddToCart: () => {}
}

export default React.memo(List);

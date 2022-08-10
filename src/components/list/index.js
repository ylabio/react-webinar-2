import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import Item from "../item";
import './style.css';

function List({items, onItemDelete, onAddToCart }) {  
  const cn = bem('List'); 

  return (
    <div className={cn()}>{items.map(item =>
      <div key={item.code} className={cn('item')}>
        <Item item={item} onDelete={onItemDelete} onAddToCart={onAddToCart}/>
      </div>
    )}
    </div>
  )
}

List.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
  onItemDelete: propTypes.func,
  onAddToCart: propTypes.func
}

List.defaultProps = {
  items: [],
  onItemDelete: () => {},
  onAddToCart: () => {}
}

export default React.memo(List);

import React from 'react';
import propTypes from 'prop-types';
import Item from "../item";
import ItemCart from "../item-cart";
import {cn as bem} from "@bem-react/classname";
import './style.css';

function List({items, isCart, onAddDeleteToCart}) {
  const cn = bem('List');

  return (
    <div className={cn()}>{items.map(item =>
      <div key={item.code} className={cn('item')}>
        {isCart
          ? <ItemCart item={item} onDeleted={onAddDeleteToCart}/>
          : <Item item={item} onAdded={onAddDeleteToCart}/>
        }
      </div>
    )}
    </div>
  )
}

List.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
  isCart: propTypes.bool,
  onAddDeleteToCart: propTypes.func,
}

List.defaultProps = {
  onAddDeleteToCart: () => {
  },
  isCart: false,
}

export default React.memo(List);

import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import Item from "../item";
import './style.css';
import ItemCart from '../item-cart';

function List({items, mode, onItemAddCart, onDeleteCart}) {
  const cn = bem('List');

  return (
    <div className={cn()}>
      {items.length > 0 ? 
        items.map(item =>
        <div key={item.code} className={cn('item')}>
          {mode === 'default' && <Item item={item} onAddCart={onItemAddCart} />}
          {mode === 'cart' && <ItemCart item={item} onDeleteCart={onDeleteCart} />}
        </div>) : 
        <div>Пусто</div>}
    </div>
  )
}

List.propTypes = {
  mode: propTypes.oneOf(['default', 'cart']),
  items: propTypes.arrayOf(propTypes.object).isRequired,
  onItemAddCart: propTypes.func,
  onDeleteCart: propTypes.func
}

List.defaultProps = {
  mode: 'default',
  onItemAddCart: () => {},
  onDeleteCart: () => {}
}

export default React.memo(List);

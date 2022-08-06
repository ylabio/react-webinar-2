import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import Item from "../item";
import './style.css';

function List({items, onAddProduct}) {
  const cn = bem('List');

  return (
    <div className={cn()}>{items.map(item =>
      <div key={item.code} className={cn('item')}>
        <Item item={item} onAddProduct={onAddProduct}/>
      </div>
    )}
    </div>
  )
}

List.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
  onAddProduct: propTypes.func
}

List.defaultProps = {
  items: [],
  onAddProduct: () => {}
}

export default React.memo(List);

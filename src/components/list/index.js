import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import Item from "../item";
import './style.css';

function List({cart, items, addToCart, deleteItem}) {
  const cn = bem('List');

  return (
    <div className={cn()}>
      {items.map((item, index) => (
        <div key={item.code} className={cn('item')}>
          <Item cart={cart} deleteItem={deleteItem} index={index} addToCart={addToCart} item={item} />
        </div>
      ))}
    </div>
  );
}

List.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
  addToCart: propTypes.func.isRequired,
  deleteItem: propTypes.func.isRequired,
  cart: propTypes.object.isRequired,
};

List.defaultProps = {
  addToCart: () => {},
  deleteItem: () => {},
  items: [],
  cart: {},
};

export default React.memo(List);

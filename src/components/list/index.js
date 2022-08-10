import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";

import './style.css';

import Item from "../item";

function List({items, handleAddItemToCart}) {
  const cn = bem('List');
  
  return (
    <div className={cn()}>{items.map(item =>
      <div key={item.code} className={cn('item')}>
        <Item
          item={item}
          handleAddItemToCart={handleAddItemToCart}
        />
      </div>
    )}
    </div>
  )
}

List.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
  handleAddItemToCart: propTypes.func
}

List.defaultProps = {
  items: [],
  handleAddItemToCart: () => {}
}

export default React.memo(List);

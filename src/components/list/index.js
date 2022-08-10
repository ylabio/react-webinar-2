import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import Item from "../item";
import ItemCart from '../item-cart';
import './style.css';


function List({items, isCart, buttonName, onItemClick}) {
  const cn = bem('List');

  return (
    <div className={cn()}>{items.map(item =>
      <div key={item.code} className={cn('item')}>
        {isCart ?
          <ItemCart
            item={item}
            buttonName={buttonName}
            onItemClick={onItemClick}
          />
          :
          <Item
            item={item}
            buttonName={buttonName}
            onItemClick={onItemClick}
          />
        }
      </div>
    )}
    </div>
  )
}

List.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
  isCart: propTypes.bool,
  buttonName: propTypes.string.isRequired,
  onItemClick: propTypes.func.isRequired,
}

List.defaultProps = {
  isCart: false
};

export default React.memo(List);

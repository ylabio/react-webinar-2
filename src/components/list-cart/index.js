import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import ItemCart from "../item-cart";
import './style.css';

function ListCart(props) {
  const cn = bem('ListСart');
  const sorted = props.items.sort(function(a, b){
    return a.code - b.code;
  });

  return (
    <div className={cn()}>{sorted.map((item, index) =>
      <div key={item.code} className={cn('item')}>
        <ItemCart index={index + 1} item={item} onSelect={props.onItemSelect} onDelete={props.onItemDelete}/>
      </div>
    )}
    </div>
  )
}

ListCart.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
  onItemSelect: propTypes.func,
  onItemDelete: propTypes.func
}

ListCart.defaultProps = {
  items: [],
  onItemSelect: () => {},
  onItemDelete: () => {}
}

export default React.memo(ListCart);

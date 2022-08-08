import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import Item from "../item";
import './style.css';
import CartItem from '../cart-item';

function List(props) {
  const cn = bem('List');

  return (
    <div className={cn()}>{props.items.map(item =>
      <div key={item.code} className={cn('item')}>
        {props.itemType === "cart" &&
          <CartItem item={item} onClickCallback={props.onItemClickCallback}/>}
        {props.itemType === "shop" &&
          <Item item={item} onClickCallback={props.onItemClickCallback}/>}
      </div>
    )}
    </div>
  )
}

List.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
  onItemClickCallback: propTypes.func,
  itemType: propTypes.string.isRequired
}

List.defaultProps = {
  items: [],
  actionType: "",
  itemType: ""
}

export default React.memo(List);

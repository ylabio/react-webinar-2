import React from 'react';
import propTypes from 'prop-types';
import { cn as bem } from "@bem-react/classname";
import Item from "../item";
import './style.css';
import ItemCart from '../item-cart';

function List(props) {
  const cn = bem('List');

  return (
    <div className={cn()}>{props.items.map(item =>
      <div key={item.code} className={cn('item')}>
        {props.isCart
          ? <ItemCart item={item} callback={props.callback} isCart={props.isCart} />
          : <Item item={item} callback={props.callback} isCart={props.isCart} />
        }
      </div>
    )}
    </div>
  )
}

List.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
  isCart: propTypes.bool,
  callback: propTypes.func
}

List.defaultProps = {
  items: [],
  isCart: false,
  callback: () => { }
}

export default React.memo(List);

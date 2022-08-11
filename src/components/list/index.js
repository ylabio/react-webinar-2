import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import Item from "../item";
import ItemCart from '../item-cart';
import './style.css';

function List(props) {
  const cn = bem('List');

  return (
    <div className={cn({'cart': props.openModal})}>{props.openModal || props.items.map(item =>
      <div key={item.code} className={cn('item')}>
        <Item 
          item={item} 
          onAddProductToCart={props.onAddProductToCart}
        />
      </div>
    )}
    {props.openModal && props.itemsCart.map((item) =>
      <div key={item.code} className={cn('item')}>
        <ItemCart item={item} onDelete={props.onItemCartDelete}/>
      </div>
    )}
    </div>
  )
}

List.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
  onAddProductToCart: propTypes.func.isRequired
}

List.defaultProps = {
  items: [],
  onAddProductToCart: () => {}
}

export default React.memo(List);

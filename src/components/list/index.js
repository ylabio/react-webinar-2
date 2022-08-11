import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import Item from "../item";
import './style.css';
import CartSumm from '../cart-sum';
import CartItem from '../cart-item';

function List(props) {
  const cn = bem('List');

  if(props.place=='store') {
  return (
    <div className={cn()}>{props.items.map(item =>
      <div key={item.code} className={cn('item')}>
        <Item item={item} onCartItems={props.onCartItems}/>
      </div>
    )}
    </div>
  )
    }
  else if (props.place=='cart'){
    return (
  <div>
      <div className={cn()}>{props.cart.itemsCart.map(item =>
      <div key={item.code} className={cn('item')}>
        <CartItem item={item} onDeteleCart={props.onDeteleCart}/>
      </div>
      )}
      </div>
      <div className={cn('Summ')}>
        <CartSumm cart={props.cart} place={'cart'}/>
        <div className={cn('Total')}>Итого</div>
      </div>
    </div>
  )}}

List.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
  onCartItems: propTypes.func.isRequired
}

List.defaultProps = {
  onCartItems: () => {},
  items:[]
}

export default React.memo(List);

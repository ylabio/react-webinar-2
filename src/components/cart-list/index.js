import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import CartItem from "../cart-item/index";
import './style.css';
import CartSumm from '../cart-sum/index';


function CartList(props) {
  const cn = bem('List');
  
  return (
    <div>
      <div className={cn()}>{props.cart.map(item =>
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
  )
}

CartList.propTypes = {
  cart: propTypes.arrayOf(propTypes.object).isRequired,
  onDeteleCart: propTypes.func
  }

  CartList.defaultProps = {
  cart: [],
  onDeteleCart: () => {}
}

export default React.memo(CartList);

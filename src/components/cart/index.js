import React from 'react';
import {cn as bem} from "@bem-react/classname";
import propTypes from 'prop-types';
import List from '../list';
import './style.css';

function Cart(props){

  const cn = bem('Cart');

  return (
    <div className={cn()}>
      <div className={cn('content')}>
        <List items={props.cart} onSelect={props.onItemDelete} />
        <div className={cn('total')}>
            <p>Итого</p> 
            <p>{props.counterTotalPrice.toLocaleString()} &#8381;</p>
        </div>
      </div>
    </div>
  )
}

Cart.propTypes = {
  cart: propTypes.arrayOf(propTypes.object).isRequired,
  counterTotalPrice: propTypes.number.isRequired,
  onItemDelete: propTypes.func.isRequired
}

Cart.defaultProps = {
}

export default React.memo(Cart);
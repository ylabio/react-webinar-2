import React from 'react'
import {cn as bem} from '@bem-react/classname'
import './style.css'
import propTypes from "prop-types";
import Item from '../item';

 function Cart(props) {
  const cn = bem('Cart');
  return (
    <div>
       {props.cart.length>0 
        ?props.cart.map((item,index)=>
          <div key={index} className={cn('item')}>
            <Item             
            item={item} 
            number={index + 1}
            count={item.count}
            deleteItem={props.deleteFromCart}
            />
          </div>) 
          : <p className={cn('empty-text')}> Пусто </p>}
          <div className={cn('sum-wrapper')}>
            <p className={cn('sum-text')}> Итого</p> <p className={cn('sum-price')}> {new Intl.NumberFormat("ru").format(props.totalPrice)} &#8381;</p>
          </div>
    </div>
  )
}
Cart.propTypes={ 
  cart: propTypes.array.isRequired,
  deleteFromCart: propTypes.func.isRequired,
  totalPrice: propTypes.number.isRequired 
}

export default React.memo(Cart)

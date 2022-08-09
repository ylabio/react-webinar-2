import React from 'react';
import {cn as bem} from '@bem-react/classname'
import './style.css'
import Item from '../item';
import { sumCart } from '../../utils';
import propTypes from "prop-types";
 

 function Modal({active, setActive, cart,deleteFromCart}) {
  const cn = bem('Modal');
  return (
    <div className={active ? cn({active}) : cn()}>
      <div className={cn('content')}>
        <div className={cn('head')}>
          <h1>Корзина</h1>
          <button className={cn('close-button')} onClick={()=>setActive(false)}>Закрыть</button>
        </div>        

        {cart.length>0 
        ?cart.map((item,index)=>
          <div key={index} className={cn('item')}>
            <Item             
            item={item} 
            number={index + 1}
            count={item.count}
            deleteItem={deleteFromCart}
            />
          </div>) 
          : <p className={cn('empty-text')}> Пусто </p>}
          <div className={cn('sum-wrapper')}>
            <p className={cn('sum-text')}> Итого</p> <p className={cn('sum-price')}> {new Intl.NumberFormat("ru").format(sumCart(cart))} &#8381;</p>
          </div>
      </div>
    </div>
  )
}
Modal.propTypes={
  active: propTypes.bool.isRequired,
  setActive: propTypes.func.isRequired,
  cart: propTypes.array.isRequired,
  deleteFromCart: propTypes.func.isRequired
 
}
Modal.defaultProps={
  active: false,
  setActive:()=>{},
  cart: [],
  deleteFromCart: ()=>{}


}

export default React.memo(Modal)
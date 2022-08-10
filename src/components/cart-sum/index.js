import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import plural from 'plural-ru';
import './style.css'


function CartSumm(props) {

  const cn = bem('CartStatus')

  
   if(props.place=='cart') {
    return (
      <div className={cn('')}>
        {props.cart.totalPrice.toLocaleString()} {<>&#8381;</>}
      </div>
  )
   }
   else if(props.place=='store'&& props.cart.totalItems>0){
     return (
       <div className={cn('')}>
       {plural(props.cart.totalItems, '%d товар','%d товара','%d товаров')} / {props.cart.totalPrice.toLocaleString()}  {<>&#8381;</>}
      </div>
    )
  }
  else return <div className={cn('')}> пусто </div> 
}

CartSumm.propTypes = {
  place: propTypes.string.isRequired,
  cart: propTypes.object.isRequired
  }

  CartSumm.defaultProps = {
    place: '',
    cart: {}
}

export default React.memo(CartSumm);

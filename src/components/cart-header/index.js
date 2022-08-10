import React, { useCallback, useEffect, useState } from 'react'
import Controls from '../controls';
import {sumCart} from '../../utils'
import propTypes from "prop-types";
import {cn as bem} from '@bem-react/classname'
import './style.css'


 function Card_header(props) {
  const cn = bem('Card-header');
  const plural = require('plural-ru');
  return (
    <div className={cn()}>
      <h4 className={cn('head')}>В корзине:</h4>      
      {props.cart.length == 0 
      ? <p className={cn('text')}>пусто</p> 
      : <p className={cn('text')}>  {props.uniqueItemsCount} {plural(props.uniqueItemsCount,"товар", "товара", "товаров")}  / {new Intl.NumberFormat("ru").format(props.totalPrice)} &#8381; </p>}

      <Controls setActive={props.setActive}/>
    </div>
  )
};
Card_header.propTypes={
  cart: propTypes.array.isRequired,
  setActive: propTypes.func.isRequired,
}


export default React.memo(Card_header);
import React, { useCallback, useState } from 'react';
import propTypes from 'prop-types';
import { cn as bem } from "@bem-react/classname";
import plural from 'plural-ru';
import './style.css';

function Item(props) {
  const cn = bem('Item');





  // };
  return (
    <div className={cn({ 'selected': props.item.selected })} >
      <div className={cn('number')}>
        {props.item.code}
      </div>
      <div className={cn('title')}>
        {props.item.title}
      </div>
      <div className={cn('price')}>
        <p>{`${props.item.price.toLocaleString()} ₽`} </p>
      </div>
      <div className={cn('actions')}>
        <button onClickCapture={() => props.onAddItemInBasket(props.item, props.basket,props.copyBasket)}>
          Добавить
        </button>
      </div>
    </div>
  )
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  basket: propTypes.array.isRequired,
  
  onAddItemInBasket: propTypes.func.isRequired,
  setCopyBasket:propTypes.func
}
Item.defaultProps = {
  setCopyBasket:()=>{},
}



export default React.memo(Item);

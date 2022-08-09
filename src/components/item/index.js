import React, { useCallback, useState } from 'react';
import propTypes from 'prop-types';
import { cn as bem } from "@bem-react/classname";
import plural from 'plural-ru';
import './style.css';

function Item(props) {
  const cn = bem('Item');



  const callbacks = {
    onAddItemInBasket: (e) => {
      e.stopPropagation()
      props.onPriceProduct(props.item.price)
      props.onAmountInBasket(props.item.code)
      if (!(props.basket.some(elementBasket => elementBasket.code === props.item.code))) {
        props.onAddBasket(props.item.code, props.item.title, props.item.price)
        props.onAmountProduct(props.item.amountInBasket)
        props.onAmountInBasket(props.item.code)
      }
    },


  };
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
        <button onClick={callbacks.onAddItemInBasket}>
          Добавить
        </button>
      </div>
    </div>
  )
}

Item.propTypes = {
  item: propTypes.object.isRequired,
  basket: propTypes.array.isRequired,
  onPriceProduct: propTypes.func.isRequired,
  onAmountProduct: propTypes.func.isRequired,
  onAmountInBasket: propTypes.func.isRequired,
  onAddBasket: propTypes.func.isRequired,
  priceProduct: propTypes.number.isRequired,
}



export default React.memo(Item);

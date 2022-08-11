import React, { useCallback, useState } from 'react';
import propTypes from 'prop-types';
import { cn as bem } from "@bem-react/classname";
import './style.css';

function Item(props) {

  const cn = bem('Item');

  const callbacks = {

    onItemDeleteFromCart: useCallback(() => {
      props.onItemDeleteFromCart(props.item.code)
    }, []),

    onAddItemToCard: useCallback(() => {
      props.onAddItemToCard(props.item.code)
    }, [])
  };

  return (
    <>
      {
        props.cart
          ?
          <div className={cn('cartContainer')}>
            <div className={cn('numTitle')}>
              <div className={cn('number')}>
                {props.item.code}
              </div>
              <div className={cn('title')}>
                {props.item.title}
              </div>
            </div>
            <div className={cn('priceCount')}>
              <div className={cn('price')}>
                {props.item.price.toLocaleString("ru-RU", {
                  style: "currency",
                  currency: "RUB",
                })}
              </div>
              <div className={cn('count')}>
                {props.item.count} шт
              </div>
              <button onClick={callbacks.onItemDeleteFromCart} >
                Удалить
              </button>
            </div>
          </div>
          :
          <div className={cn({ 'selected': props.item.selected })}>
            <div className={cn('number')}>
              {props.item.code}
            </div>
            <div className={cn('title')}>
              {props.item.title}
            </div>
            <div className={cn('itemPrice')}>
              {props.item.price.toLocaleString("ru-RU", {
                style: "currency",
                currency: "RUB",
              })}
            </div>
            <div className={cn('actions')}>
              <button onClick={callbacks.onAddItemToCard}>
                Добавить
              </button>
            </div>
          </div>
      }
    </>
  )
}

Item.propTypes = {
  cards: propTypes.arrayOf(propTypes.object).isRequired,
  onItemDeleteFromCart: propTypes.func,
  onAddItemToCard: propTypes.func,
}

Item.defaultProps = {
  cards: [],
  onItemSelect: () => { },
  onItemDeleteFromCart: () => { }
}


export default React.memo(Item);

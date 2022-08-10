import React, { useState } from 'react'
import cls from '../modal.module.css'
import Item from '../../item';
export const Cart = ({ onItemDeleteFromCart, totalPrice, cart }) => {

  console.log('render')
  return (
    <>
      {
        cart.map(card => {
          return (
            <Item
              key={card.code}
              onItemDeleteFromCart={onItemDeleteFromCart}
              item={card}
              cart={true}
            />)

        })
      }
      <div className={cls.totalPriceContainer}>
        <b>
          Итого
        </b>
        <b>
          {totalPrice.toLocaleString("ru-RU", {
            style: "currency",
            currency: "RUB",
          })}
        </b>
      </div>
    </>
  )
}

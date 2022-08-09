import React, { useState } from 'react'
import cls from 'modal.module.css'
import Item from '../item';

export const Modal = ({ onItemDeleteFromCart, totalPrice, cart, setOpenModal }) => {

console.log('render')
  return (
    <div className={cls.modal}>
      <div className={cls.modalContent}>
        <div className={cls.modalHeader}>
          <span>Корзина</span>
          <button onClick={() => setOpenModal(false)} >Закрыть</button>
        </div>
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




      </div>
    </div>
  )
}

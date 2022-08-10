import React, { useState } from 'react'
import cls from 'modal.module.css'
import { Cart } from './cart/cart';
import propTypes from 'prop-types';

export const Modal = ({ onItemDeleteFromCart, totalPrice, cart, setOpenModal }) => {

  console.log('render')
  return (
    <div className={cls.modal}>
      <div className={cls.modalContent}>
        <div className={cls.modalHeader}>
          <span>Корзина</span>
          <button onClick={() => setOpenModal(false)} >Закрыть</button>
        </div>
        <Cart
        onItemDeleteFromCart={onItemDeleteFromCart}
        totalPrice={totalPrice}
        cart={cart}
        />
      </div>
    </div>
  )
}
Modal.propTypes = {
  onItemDeleteFromCart: propTypes.func.isRequired,
  setOpenModal: propTypes.func.isRequired,
  totalPrice: propTypes.node,
}

Modal.defaultProps = {
  onItemDeleteFromCart: () => { },
  setOpenModal: () => { },
}

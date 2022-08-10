import React, { useState } from 'react';
import propTypes from 'prop-types';
import './style.css';
import { Modal } from './../modal/modal';
import plural from 'plural-ru'
import { OpenModalButton } from './open-modal-button/openModalButton';

function Controls({totalPrice, setOpenModal,openModal, cart}) {



  return (
    <div className='Controls'>
      {
        totalPrice === 0
          ?
          <span>В корзине: <b>Пусто</b> </span>
          :
          <span>В корзине: <b>{plural(cart.length, '%d товар', '%d товара', '%d товаров')}</b><b> / {totalPrice.toLocaleString("ru-RU", {
            style: "currency",
                        currency: "RUB",
          })}</b>
          </span>
      }
      <OpenModalButton
      setOpenModal={setOpenModal}
      openModal={openModal}
      />
    </div>
  )
}

Controls.propTypes = {
  setOpenModal: propTypes.func.isRequired,
  openModal: propTypes.func.isRequired,
  totalPrice: propTypes.node,
  cart: [],
}

Controls.defaultProps = {
  onItemDeleteFromCart: () => { },
  setOpenModal: () => { },
  openModal: () => { },
  cart:[]
}


export default React.memo(Controls);

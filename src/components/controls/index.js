import React, { useState } from 'react';
import propTypes from 'prop-types';
import './style.css';
import { Modal } from './../modal/modal';
import plural from 'plural-ru'
import { OpenModalButton } from './open-modal-button/openModalButton';

function Controls({totalPrice,productsCount, setOpenModal,openModal}) {



  return (
    <div className='Controls'>
      {
        productsCount === 0
          ?
          <span>В корзине: <b>Пусто</b> </span>
          :
          <span>В корзине: <b>{plural(productsCount, '%d товар', '%d товара', '%d товаров')}</b><b> / {totalPrice.toLocaleString("ru-RU", {
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
  openModal: propTypes.bool,
  totalPrice: propTypes.node,
  productsCount: propTypes.node,
}

Controls.defaultProps = {
  onItemDeleteFromCart: () => { },
  setOpenModal: () => { },
}


export default React.memo(Controls);

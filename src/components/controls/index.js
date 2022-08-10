import React, { useState } from 'react';
import propTypes from 'prop-types';
import './style.css';
import { Modal } from './../modal/modal';
import plural from 'plural-ru'
import { OpenModalButton } from './openModalButton/openModalButton';

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
  onAdd: propTypes.func.isRequired // Обяхательное свойство - функция

}

Controls.defaultProps = {
  onAdd: () => { } // Значение по умолчанию - функция-заглушка
}

export default React.memo(Controls);

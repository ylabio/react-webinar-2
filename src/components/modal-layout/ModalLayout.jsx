import React from 'react'
import { Modal } from '../modal/modal'

export const ModalLayout = ({ openModal,onItemDeleteFromCart,key,cart,setOpenModal,totalPrice }) => {
  return (
    <>
      {
        openModal
        &&
        <Modal
          onItemDeleteFromCart={onItemDeleteFromCart}
          key={key}
          cart={cart}
          setOpenModal={setOpenModal}
          totalPrice={totalPrice}
        />
      }
    </>
  )
}

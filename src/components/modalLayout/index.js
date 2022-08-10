import React from 'react'
import Modal from '../modal/index'

function ModalLayout ({closeModal, basketItems, deleteItemFromBasket, totalPrice}) {
    return (
        <>
            <Modal
                closeModal = {closeModal}
                basketItems = {basketItems}
                deleteItemFromBasket = {deleteItemFromBasket}
                totalPrice = {totalPrice}
            />
        </>
    )
}

export default React.memo(ModalLayout)
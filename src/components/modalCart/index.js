import React from 'react'
import Modal from '../modal'
import Cart from '../cart'
import propTypes from 'prop-types';

function ModalCart({
  closeCart,
  onItemClick,
  cart
}) {
  return (
    <Modal handleClose={closeCart}>
      <Cart handleClose={closeCart}
            onClick={e => e.stopPropagation()}
            handleBtn={onItemClick}
            cart={cart}
      />
    </Modal>
  )
}

ModalCart.propTypes = {
  closeCart: propTypes.func.isRequired,
  onItemClick: propTypes.func.isRequired,
  cart: propTypes.object.isRequired
}

export default React.memo(ModalCart)
import React, { useCallback, useEffect } from "react";
import ModalLayout from "../../layout/modal-layout";
import './style.css';
import { getCartItems } from "../../shared/utils";
import CartDump from "../cart-dump";
import propTypes from 'prop-types';

function Cart({ 
  isCartOpen, 
  goods, 
  handleModal, 
  removeItemFromCart, 
}) {
  const items = getCartItems(goods.items);

  const callbacks = {
    closeModal: useCallback(() => {
      handleModal(false);
    }, []),
  };

  useEffect(() => {
    if (goods.total === 0) {
      callbacks.closeModal();
    }
  }, [goods.total])

  return (
    <ModalLayout closeModal={callbacks.closeModal}>
      <CartDump
        removeItemFromCart={removeItemFromCart}
        closeModal={callbacks.closeModal}
        isCartOpen={isCartOpen}
        price={goods.price}
        items={items}
        id={goods.id}
      />
    </ModalLayout>
  );
}

Cart.propTypes = { 
  goods: propTypes.object.isRequired,
  removeItemFromCart: propTypes.func.isRequired,
  handleModal: propTypes.func.isRequired,
  isCartOpen: propTypes.bool.isRequired,
};

Cart.defaultProps = {
  removeItemFromCart: () => {},
  handleModal: () => {},
  isCartOpen: false,
};

export default Cart;


import React, { useCallback, useContext, useEffect } from "react";
import ModalLayout from "../../layout/modal-layout";
import './style.css';
import { AppContext } from "../../context/app-context";
import { getCartItems } from "../../shared/utils";
import CartDump from "../cart-dump";

function Cart() {
  const { store } = useContext(AppContext);
  const { isCartOpen, goods } = store.state;
  const items = getCartItems(store.state.goods.items);

  const callbacks = {
    closeModal: useCallback(() => {
      store.handleModal(false);
    }, []),

    removeItemFromCart: useCallback((item) => {
      store.removeItemFromCart(item);
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
        removeItemFromCart={callbacks.removeItemFromCart}
        closeModal={callbacks.closeModal}
        isCartOpen={isCartOpen}
        price={goods.price}
        items={items}
        id={goods.id}
      />
    </ModalLayout>
  );
}

export default Cart;


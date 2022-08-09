import React from 'react';
import propTypes from 'prop-types';
import Cart from 'src/components/cart';
import ModalBasic from 'src/components/modal-basic';

function ModalCart(props) {
  return (
      <ModalBasic closeModal={props.onCloseModal} isActive={props.isActiveModal}>
        <Cart items={props.cart}
              total={props.totalSum}
              onDeleteToCartItem={props.onDeleteToCartItem}/>
      </ModalBasic>
  )
}

ModalCart.propTypes = {
  cart: propTypes.arrayOf(propTypes.object).isRequired,
  isActiveModal: propTypes.bool.isRequired,
  totalSum: propTypes.string.isRequired,
  onDeleteToCartItem: propTypes.func.isRequired,
  onCloseModal: propTypes.func.isRequired,
}

export default React.memo(ModalCart);

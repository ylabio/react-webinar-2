import React, { memo } from 'react';
import LayoutModal from '../layout-modal';
import ListModal from '../list-modal';
import propTypes from 'prop-types';

const Modal = ({ onActiveCart, cart, onDelete, sumInCart }) => {
  return (
    <LayoutModal head={<h1>Корзина</h1>} onActiveCart={onActiveCart}>
      {cart.length !== 0 ? (
        <ListModal cart={cart} onDelete={onDelete} sumInCart={sumInCart} />
      ) : (
        'Пока тут пуcто'
      )}
    </LayoutModal>
  );
};

Modal.propTypes = {
  cart: propTypes.arrayOf(propTypes.object).isRequired,
  onActiveCart: propTypes.func,
  onDelete: propTypes.func,
  sumInCart: propTypes.number,
};

Modal.defaultProps = {
  cart: [],
  onActiveCart: () => {},
  onDelete: () => {},
  sumInCart: () => {},
};

export default memo(Modal);

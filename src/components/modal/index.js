import React, { memo } from 'react';
import LayoutModal from '../layout-modal';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import List from '../list';

const Modal = ({ onActiveCart, cart, onDelete, sumInCart, activeCart }) => {
  const cn = bem('Modal');

  return (
    <LayoutModal head={<h1>Корзина</h1>} onActiveCart={onActiveCart}>
      {cart.length ? (
        <List
          items={cart}
          onDelete={onDelete}
          sumInCart={sumInCart}
          activeCart={activeCart}
        />
      ) : (
        <div className={cn('empty')}>Пока тут пуcто</div>
      )}
    </LayoutModal>
  );
};

Modal.propTypes = {
  cart: propTypes.arrayOf(propTypes.object).isRequired,
  onActiveCart: propTypes.func,
  onDelete: propTypes.func,
  sumInCart: propTypes.number,
  activeCart: propTypes.bool,
};

Modal.defaultProps = {
  cart: [],
  onActiveCart: () => {},
  onDelete: () => {},
  activeCart: false,
};

export default memo(Modal);

import React from 'react';
import List from '../../components/list';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import { formatCurrency } from '../../utils';

function Modal({ active, cartItems, price, onOpenModal, onItemDelete }) {
  const cn = bem('Modal');
  return (
    <div className={active ? cn() : cn('hidden')}>
      <div className={cn('content')}>
        <div className={cn('head')}>
          <h2>Корзина</h2>
          <button
            className={cn('button')}
            onClick={() => {
              onOpenModal();
            }}>
            Закрыть
          </button>
        </div>
        {cartItems.length > 0 ? (
          <>
            <List onItemDelete={onItemDelete} items={cartItems} />
            <div className={cn('details')}>
              <div className={cn('total')}>Итого</div>
              <div>{formatCurrency(price)}</div>
            </div>
          </>
        ) : (
          <h2 className={cn('empty')}>Корзина пуста!</h2>
        )}
      </div>
    </div>
  );
}

Modal.propTypes = {
  active: propTypes.bool.isRequired,
  cartItems: propTypes.arrayOf(propTypes.object).isRequired,
  price: propTypes.number.isRequired,
  onOpenModal: propTypes.func,
  onItemDelete: propTypes.func,
};

Modal.defaultProps = {
  onOpenModal: () => {},
  onItemDelete: () => {},
};

export default React.memo(Modal);

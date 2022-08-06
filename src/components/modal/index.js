import React from 'react';
import propTypes from 'prop-types';
import './style.css';
import { cn as bem } from '@bem-react/classname';
import List from '../list';

function Modal({ closeModal, items, onItemDeleteBucket, totalPrice }) {
  const cn = bem('Modal');

  return (
    <div className={cn()}>
      <div className={cn('content')}>
        <div className={cn('header')}>
          <h2>Корзина</h2>
          <button onClick={closeModal}>Закрыть</button>
        </div>
        <List items={items} onItemDeleteBucket={onItemDeleteBucket} />
        {items.length ? (
          <div className={cn('total')}>
            Итого:{new Intl.NumberFormat('ru', {
              style: 'currency', 
              currency: 'RUB',
              minimumFractionDigits: 0})
              .format(totalPrice)}
          </div>
        ) :<h1 className={cn('content')}></h1> }
      </div>
    </div>
  );
}

Modal.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
  closeModal: propTypes.func.isRequired,
  onItemDeleteBucket: propTypes.func,
  totalPrice: propTypes.number,
};

Modal.defaultProps = {
  items: [],
  closeModal: () => {},
  onItemDeleteBucket: () => {},
  totalPrice: 0,
};

export default React.memo(Modal);

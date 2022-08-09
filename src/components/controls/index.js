import React from 'react';
import propTypes from 'prop-types';
import './style.css';
import { cn as bem } from '@bem-react/classname';
import plural from 'plural-ru';

function Controls({ setIsModalOpen, cart }) {
  const handleOpenModal = () => {
    setIsModalOpen((prev) => !prev);
  };
  const cn = bem('Controls');

  return (
    <div className="Controls">
      <p className={cn('cart')}>В корзине:</p>

      {cart.cartItems.length ? (
        <p className={cn('info')}>
          {cart.totalAmount}{' '}
          {plural(cart.totalAmount, 'товар', 'товара', 'товаров')} /{' '}
          {new Intl.NumberFormat('ru', {
            style: 'currency',
            currency: 'RUB',
            minimumFractionDigits: 0,
          }).format(cart.totalPrice)}
        </p>
      ) : (
        <p className={cn('info')}>пусто</p>
      )}
      <button onClick={handleOpenModal}>Перейти</button>
    </div>
  );
}

Controls.propTypes = {
  setIsModalOpen: propTypes.func.isRequired, // Обязательное свойство - функция
  cart: propTypes.object.isRequired,
};

Controls.defaultProps = {
  setIsModalOpen: () => {}, // Значение по умолчанию - функция-заглушка
  cart: {},
};

export default React.memo(Controls);

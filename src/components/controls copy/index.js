import React from 'react';
import propTypes from 'prop-types';
import './style.css';
import { cn as bem } from '@bem-react/classname';
import plural from 'plural-ru';

function Controls({ setIsModalOpen, bucket }) {
  const handleOpenModal = () => {
    setIsModalOpen((prev) => !prev);
  };
  const cn = bem('Controls');

  return (
    <div className="Controls">
      <p className={cn('bucket')}>В корзине:</p>

      {bucket.bucketElements.length ? (
        <p className={cn('info')}>

          {bucket.totalAmount}{' '}

          {plural(bucket.totalAmount, 'товар', 'товара', 'товаров')} /{' '}

          {new Intl.NumberFormat('ru', {
            style: 'currency',
            currency: 'RUB',
            minimumFractionDigits: 0 }).format(bucket.totalPrice)}
        </p>
      ) : 
      (
        <p className={cn('info')}>В корзине нет товаров</p>
      )
      }
      <button onClick={handleOpenModal}>Перейти</button>
    </div>
  );
}

Controls.propTypes = {
  setIsModalOpen: propTypes.func.isRequired, // Обязательное свойство - функция
  bucket: propTypes.object.isRequired,
};

Controls.defaultProps = {
  setIsModalOpen: () => {}, // Значение по умолчанию - функция-заглушка
  bucket: {},
};

export default React.memo(Controls);

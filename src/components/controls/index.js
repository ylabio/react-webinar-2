import React from 'react';
import { formatCurrency } from '../../utils';
import { cn as bem } from '@bem-react/classname';
import propTypes from 'prop-types';
import './style.css';
const plural = require('plural-ru');

function Controls({ onOpenModal, count, price }) {
  const cn = bem('Controls');
  return (
    <div className={cn()}>
      <span className={cn('label')}>В корзине:</span>
      {count > 0 ? (
        <span className={cn('info')}>
          {plural(count, '%d товар', '%d товара', '%d товаров')} /{' '}
          {formatCurrency(price)}
        </span>
      ) : (
        <span className={cn('info')}>пусто</span>
      )}

      <button
        className={cn('button')}
        onClick={() => {
          onOpenModal();
        }}>
        Перейти
      </button>
    </div>
  );
}

Controls.propTypes = {
  count: propTypes.number.isRequired,
  price: propTypes.number.isRequired,
  onOpenModal: propTypes.func,
};

Controls.defaultProps = {
  onOpenModal: () => {}, // Значение по умолчанию - функция-заглушка
};

export default React.memo(Controls);

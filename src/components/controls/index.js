import React from 'react';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import plular from 'plural-ru';
import './style.css';
import Button from '../button';

function Controls({ amountItemsInCart, onToggleCart, uniqueItemsInCart }) {
  const cn = bem('Controls');

  return (
    <div className={cn()}>
      В корзине:
      {uniqueItemsInCart ? (
        <span className={cn('info')}>
          {`${uniqueItemsInCart} ${plular(uniqueItemsInCart, 'товар', 'товара', 'товаров')}`} /{' '}
          {`${amountItemsInCart.toLocaleString('ru-RU')} ₽`}
        </span>
      ) : (
        <span className={cn('info')}>пусто</span>
      )}
      <Button onClick={() => onToggleCart(true)}>Перейти</Button>
    </div>
  );
}

Controls.propTypes = {
  amountItemsInCart: propTypes.number,
  onToggleCart: propTypes.func.isRequired,
  uniqueItemsInCart: propTypes.number,
};

Controls.defaultProps = {
  amountItemsInCart: 0,
  uniqueItemsInCart: 0,
};

export default React.memo(Controls);

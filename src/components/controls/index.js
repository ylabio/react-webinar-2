import React from 'react';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import plular from 'plural-ru';
import './style.css';
import Button from '../button';

function Controls({ cartQuantity, cartPrice, onToggleCart, uniqueItemsInCart }) {
  const cn = bem('Controls');

  return (
    <div className={cn()}>
      В корзине:
      <span className={cn('info')}>
        {`${uniqueItemsInCart} ${plular(uniqueItemsInCart, 'товар', 'товара', 'товаров')}`} /{' '}
        {`${cartPrice.toLocaleString('ru-RU')} ₽`}
      </span>
      <Button onClick={() => onToggleCart(true)}>Перейти</Button>
    </div>
  );
}

Controls.propTypes = {
  cartQuantity: propTypes.number,
  cartPrice: propTypes.number,
  onToggleCart: propTypes.func.isRequired,
  uniqueItemsInCart: propTypes.number,
};

Controls.defaultProps = {
  cartQuantity: 0,
  cartPrice: 0,
  uniqueItemsInCart: 0,
};

export default React.memo(Controls);

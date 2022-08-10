import React, { memo } from 'react';
import propTypes, { number } from 'prop-types';
import './style.css';
import { cn as bem } from '@bem-react/classname';
import plural from 'plural-ru';

function Controls({ cart, onActiveCart, sumInCart }) {
  const cn = bem('Controls');

  return (
    <div className={cn()}>
      <div className={cn('title')}>В корзине:</div>
      <div className={cn('items')}>
        {cart.length
          ? `${plural(
              cart.length,
              '%d товар',
              '%d товара',
              '%d товаров'
            )} / ${sumInCart.toLocaleString('ru-RU')} ₽`
          : 'пусто'}
      </div>
      <button className={cn('actions')} onClick={onActiveCart}>
        Перейти
      </button>
    </div>
  );
}

Controls.propTypes = {
  cart: propTypes.arrayOf(propTypes.object).isRequired,
  onActiveCart: propTypes.func,
  sumInCart: number,
};

Controls.defaultProps = {
  cart: [],
  onActiveCart: () => {},
};

export default memo(Controls);

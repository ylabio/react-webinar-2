import React from 'react';
import { getCartCost } from '../../utils';
import propTypes from 'prop-types';
import plural from 'plural-ru';
import './style.css';
import { cn as bem } from '@bem-react/classname';

function Controls({ handleClick, cart }) {
  const cn = bem('Controls');

  return (
    <div className={cn()}>
      <div className={cn('title')}>
        В корзине:
        <span className={cn('boldText')}>
          {cart.length
            ? `${plural(cart.length, '%d товар', '%d товара', '%d товаров')} / ${getCartCost(
                cart,
              ).toLocaleString('ru')} ₽`
            : 'пусто'}
        </span>
      </div>
      <div className={cn('actions')}>
        <button onClick={handleClick}>Перейти</button>
      </div>
    </div>
  );
}

Controls.propTypes = {
  handleClick: propTypes.func.isRequired, 
  cart: propTypes.arrayOf(propTypes.object).isRequired,
};

Controls.defaultProps = {};

export default React.memo(Controls);

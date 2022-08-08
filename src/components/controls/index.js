import React from 'react';
import propTypes from 'prop-types';
import plural from 'plural-ru';
import {cn as bem} from '@bem-react/classname';
import './style.css';
import {arrayToCart, currencySign as roubleSign} from '../../utils';

function Controls({onOpenCart, cartItems}) {
  const cn = bem('Controls');
  const numberOfitems = arrayToCart(cartItems).length;
  const itemPlural = plural(numberOfitems, 'товар', 'товара', 'товаров');
  const resultSum = cartItems
    .map(item => item.price)
    .reduce((acc, curr) => acc + curr, 0);

  return (
    <div className={cn()}>
      <p>
        В корзине:{' '}
        <span>
          {numberOfitems
            ? `${numberOfitems} ${itemPlural} / ${resultSum} ${roubleSign}`
            : `пусто`}
        </span>
      </p>
      <div className={cn('actions')}>
        <button onClick={onOpenCart}>Перейти</button>
      </div>
    </div>
  );
}

Controls.propTypes = {
  onAdd: propTypes.func.isRequired // Обяхательное свойство - функция
};

Controls.defaultProps = {
  onAdd: () => {} // Значение по умолчанию - функция-заглушка
};

export default React.memo(Controls);

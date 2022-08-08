import React from 'react';
import propTypes from 'prop-types';
import plural from 'plural-ru';
import {cn as bem} from '@bem-react/classname';
import './style.css';
import {arrayToCart, currencySign as roubleSign} from '../../utils';

function Controls({total, amount, onOpenCart}) {
  const itemPlural = plural(amount, 'товар', 'товара', 'товаров');

  const cn = bem('Controls');
  return (
    <div className={cn()}>
      <p>
        В корзине:{' '}
        <span>
          {amount
            ? `${amount} ${itemPlural} / ${total.toLocaleString()} ${roubleSign}`
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
  onOpenCart: propTypes.func.isRequired,
  total: propTypes.number,
  amount: propTypes.number
};

Controls.defaultProps = {
  onOpenCart: () => {}
};

export default React.memo(Controls);

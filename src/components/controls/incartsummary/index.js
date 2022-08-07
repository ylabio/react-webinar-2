import React from 'react';
import { cn as bem } from '@bem-react/classname';
import plural from 'plural-ru';
import { cartSummary } from '../../../utils';

function InCartSummary({ cart }) {
  const cn = bem('Controls');
  return (
    <div className={cn('summary')}>
      В корзине:
      <div className={`${cn('summary-count')} bold-text`}>
        {cart.length
          ? cart.length +
            ' ' +
            plural(cart.length, 'товар', 'товара', 'товаров') +
            ' / ' +
            cartSummary(cart) +
            ' ₽'
          : 'пусто'}
      </div>
    </div>
  );
}

export default React.memo(InCartSummary);

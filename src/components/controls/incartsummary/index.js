import React from 'react';
import { cn as bem } from '@bem-react/classname';
import plural from 'plural-ru';
import { cartSummary } from '../../../utils';
import NumberFormat from 'react-number-format';

function InCartSummary({ cart }) {
  const cn = bem('Controls');
  console.log(cart.count);
  return (
    <div className={cn('summary')}>
      В корзине:
      <div className={`${cn('summary-count')} bold-text`}>
        {cart.count ? (
          <>
            <NumberFormat
              value={cart.count}
              thousandSeparator={' '}
              displayType={'text'}
              suffix={` ${plural(cart.count, 'товар', 'товара', 'товаров')} / `}
            />
            <NumberFormat
              value={cart.amount}
              suffix=' ₽'
              displayType={'text'}
              thousandSeparator={' '}
            />
          </>
        ) : (
          'пусто'
        )}
      </div>
    </div>
  );
}

export default React.memo(InCartSummary);

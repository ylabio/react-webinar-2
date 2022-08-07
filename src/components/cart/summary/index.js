import React from 'react';
import { cn as bem } from '@bem-react/classname';
import { cartSummary } from '../../../utils';

function Summary({ cart }) {
  const cn = bem('Cart');
  return (
    <div className={cn('summary')}>
      <div className='bold-text'>Итого</div>
      <div className='bold-text'>{cartSummary(cart)} ₽</div>
    </div>
  );
}

export default React.memo(Summary);

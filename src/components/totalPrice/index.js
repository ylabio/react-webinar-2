import React from 'react';
import { cn as bem } from '@bem-react/classname';
import './style.css';

const TotalPrice = ({totalPrice}) => {
  const cn = bem('Popup');
  return (
    <div className={cn('total')}>
      <p className={cn('total-word')}>Итого</p>
      <p className={cn('total-number')}>{`${totalPrice.toLocaleString(
        'ru-RU'
      )} ₽`}</p>
    </div>
  );
};

export default React.memo(TotalPrice);

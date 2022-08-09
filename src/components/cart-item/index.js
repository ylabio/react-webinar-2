import React, { useCallback } from 'react';
import Actions from '../actions';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function CartItem(props) {
  const cn = bem('CartItem');

  const { item, callback } = props;

  const handleCallback = useCallback(() => {
    callback.action(item);
  }, [callback.action, item]);

  return (
    <div className={cn()}>
      <div className={cn('number')}>{item.code}</div>
      <div className={cn('title')}>{item.title}</div>
      <div className={cn('price')}>{item.price.toLocaleString('ru-Ru')}</div>
      <div className={cn('count')}>{item.count + ' шт'}</div>
      <Actions action={handleCallback} name={callback.name} />
    </div>
  );
}

export default React.memo(CartItem);

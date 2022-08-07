import React from 'react';
import './style.css';
import { cn as bem } from "@bem-react/classname";
import Button from '../button';

function Cart({ head, children, visible, onInvisibleCart }) {
  const cn = bem('Cart');

  return (
    <div className={cn({ 'active': visible })}>
      <div className={cn('content')}>
        <div className={cn('head')}>
          {head}
          <Button onClick={onInvisibleCart}>Закрыть</Button>
        </div>
        <div className={cn('body')}>
          {children}
        </div>
      </div>
    </div>
  )
}

export default React.memo(Cart)
import React from 'react';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function Modal({children, onClose}) {
  const cn = bem('Modal');
  return (
    <div className={cn()}>
      <div className={cn('content')}>
        <div className={cn('head')}>
          <h1>Корзина</h1>
          <button onClick={onClose}>Закрыть</button>
        </div>
        {children}
      </div>
    </div>
  );
}

export default React.memo(Modal);

import React from 'react';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function Modal({children, onClose}) {
  const cn = bem('Modal');
  return (
    <div className={cn()}>
      <div className={cn('content')}>
        <button onClick={onClose}>Закрыть</button>
        {children}
      </div>
    </div>
  );
}

export default React.memo(Modal);

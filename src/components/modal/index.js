import React from 'react';
import './style.css';
import { cn as bem } from "@bem-react/classname";

function Modal({onToggleModal, head, children}) {
  const cn = bem('Modal');

  return (
        <div className={cn()}>
          <div className={cn('content')}>
            <div className={cn('head')}>
              {head}
              <button onClick={onToggleModal}>Закрыть</button>
            </div>
            {children}
          </div>
        </div>
  );
}

export default React.memo(Modal);

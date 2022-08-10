import React from "react";
import {cn as bem} from "@bem-react/classname";
import './style.css';

export function Modal({title, closeModal, children}) {
  const cn = bem('Modal');
  return (
    <div className='modal-background'>
      <div className={cn()}>
        <div className={cn('head')}>
          <h1>{title}</h1>
          <div className={cn('button')}>
            <button onClick={() => closeModal(false)}>Закрыть</button>
          </div>
        </div>
        <div className={cn('content')}>
          {children}
        </div>
      </div>
    </div>
  )
}
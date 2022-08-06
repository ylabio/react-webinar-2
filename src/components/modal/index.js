import React from 'react';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Modal({ headerTitle, headerButtonTitle, onClick, children }) {
  const cn = bem('Modal');

  return (
    <div className={cn('mask')}>
      <div className={cn('container')}>
        <div className={cn('head')}>
          <h1>
            {headerTitle}
          </h1>
          <button onClick={onClick}>
            {headerButtonTitle}
          </button>
        </div>
        <div className={cn('content')}>
          {children}
        </div>
      </div>
    </div>
  );
}

Modal.propTypes = {
  headerTitle: propTypes.string,
  headerButtonTitle: propTypes.string,
  onClick: propTypes.func,
  children: propTypes.node
};

export default Modal;

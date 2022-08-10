import React, { useCallback } from 'react';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import propTypes from "prop-types";



function Modal({head, children, show, onClose}) {

  const cn = bem('Modal');
  
  return (
    <div className={cn('wraper')} onClick={onClose}>
      <div className={cn('modal')} onClick={e => e.stopPropagation()}>
        <div className={cn('header')}>
          <div className={cn('name')}>{head}</div>
          <button className={cn('button')} onClick={onClose}> закрыть </button>
        </div>
        <div className={cn('content')}>
          {children}
        </div>
      </div>
    </div>
  );
}

Modal.propTypes = {
  head: propTypes.node,
  children: propTypes.node,
}

Modal.defaultProps = {
}

export default React.memo(Modal);

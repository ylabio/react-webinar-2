import React from 'react';
import {cn as bem} from "@bem-react/classname";
import propTypes from 'prop-types';
import './style.css';

function Modal({head, children, onClose}){
  const cn = bem('Modal');

  return (<div>
        <div className={cn('container')}>
          <div className={cn('head')}>
            {head}
            <button onClick={onClose}>Закрыть</button>
          </div>            
          {children}        
        </div>
        <div className={cn('bg')} onClick={onClose} />
      </div>)
}

Modal.propTypes = {
  head: propTypes.node.isRequired,
  children: propTypes.node,
  onClose: propTypes.func.isRequired,
}

Modal.defaultProps = {
  head: <h1>Заголовок</h1>,
  children: null,
}

export default React.memo(Modal);

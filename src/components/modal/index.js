import React from 'react';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import propTypes from "prop-types"; 


function Modal({head, children, onCloseModal}){
  const cn = bem('Modal');

  const stopPropagation = e => e.stopPropagation();

  return (
    <div className={cn()} onClick={onCloseModal}>
      <div className={cn('body')} >
        <div className={cn('inner')} onClick={stopPropagation}>
          <div className={cn('head')}>
            {head}
            <button className={cn('close')} onClick={onCloseModal}>Закрыть</button>
          </div>
          <div className={cn('content')}>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}


Modal.propTypes = {
  head: propTypes.node,
  children: propTypes.node,
  onCloseModal: propTypes.func.isRequired
}

Modal.defaultProps = {
  onCloseModal: () => {} // Значение по умолчанию - функция-заглушка
}


export default React.memo(Modal);

import React, {useCallback} from 'react';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import propTypes from "prop-types";

function ModalLayout({head, children, onClose}){
  const cn = bem('ModalLayout');

  const callbacks = {
    onClose: useCallback(() => {
      onClose();
    }, [onClose]),
  };

  return (
    <div className={cn('overlay')}>
      <div className={cn()}>
        <div className={cn('header')}>
          {head}
          <button onClick={callbacks.onClose}>Закрыть</button>
        </div>
        <div className={cn('content')}>
          {children}
        </div>
      </div>
    </div>
  )
}

ModalLayout.propTypes = {
  head: propTypes.node.isRequired,
  children: propTypes.node.isRequired,
  onClose: propTypes.func.isRequired,
}

export default React.memo(ModalLayout);

import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function Modal({onClose, title, children}){
  const cn = bem('Modal');

  const callbacks = {
    onClose: useCallback(() => {
      onClose()
    }, [onClose])
  };

  return (
    <div className={cn()}>
      <div className={cn('content')}>
        <div className={cn('head')}>
          <div className={cn('title')}>{title}</div>
          <button  className={cn('close')}
                   onClick={callbacks.onClose}>Закрыть</button></div>
        {children}
      </div>
    </div>
  );
}

Modal.propTypes = {
  title: propTypes.string.isRequired,
  children: propTypes.node.isRequired,
  onClose: propTypes.func.isRequired
}

export default React.memo(Modal);

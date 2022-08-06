import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function Modal({active, onClose, title, children}){
  const cn = bem('Modal');

  const callbacks = {
    onClose: useCallback(() => {
      onClose()
    }, [onClose, active])
  };

  return (
    <div className={active ? `${cn()} active` : cn()}>
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

}

export default React.memo(Modal);

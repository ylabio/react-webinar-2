import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";

/** Styles */
import './style.css';

function Modal(props) {
  const cn = bem('Modal');

  const callbacks = {
    onClose: useCallback(() => props.onClose(), [props.isOpened, props.onClose]),
    onModalWindowClick: useCallback(e => e.stopPropagation(), []),
  };

  return (
    <div
      className={cn('inner') + (props.isOpened ? ` ${cn('inner-shown')}` : '')}
      onClick={callbacks.onClose}
    >
      <div className={cn()} onClick={callbacks.onModalWindowClick}>
        <div className={cn('header')}>
          <h1>{props.title}</h1>
          <button onClick={callbacks.onClose}>Закрыть</button>
        </div>
        <div className={cn('content')}>{props.children}</div>
      </div>
    </div>
  );
}

Modal.propTypes = {
  isOpened: propTypes.bool,
  title: propTypes.string,
  children: propTypes.node,
  onClose: propTypes.func,
}

Modal.defaultProps = {
  isOpened: false,
  title: '',
  onClose: () => {},
}

export default React.memo(Modal);

import React from 'react';
import './style.css';
import propTypes from 'prop-types';
import { cn as bem } from "@bem-react/classname";
import Button from '../button';

function Modal({ head, onInvisibleModal, children }) {
  const cn = bem('Modal');

  return (
    <div className={cn()}>
      <div className={cn('content')}>
        <div className={cn('head')}>
          <h1>{head}</h1>
          <Button onClick={onInvisibleModal}>Закрыть</Button>
        </div>
        <div className={cn('body')}>{children}</div>
      </div>
    </div>
  )
}

Modal.propTypes = {
  head: propTypes.node.isRequired,
  children: propTypes.node.isRequired,
  onInvisibleModal: propTypes.func,
}

Modal.defaultProps = {
  onInvisibleModal: () => { }
}

export default React.memo(Modal)
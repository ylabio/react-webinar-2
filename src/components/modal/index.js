import React from 'react';
import propTypes from "prop-types";
import {cn as bem} from "@bem-react/classname";
import './style.css';


function Modal({head, children, onClose}) {
  const cn = bem('Modal');
  return (
    <div className={cn()}>
      <div className={cn('container')}>
        <div className={cn('head')}>
          {head}
          <button onClick={onClose}>Закрыть</button>
        </div>
        <div className={cn('content')}>
          {children}
        </div>
      </div>
    </div>
  )
}

Modal.propTypes = {
  onClose: propTypes.func.isRequired,
  head: propTypes.node,
  children: propTypes.node,
}

Modal.defaultProps = {
  isShow: false,
  onClose: () => {}
}

export default React.memo(Modal);
import React from 'react';
import './style.css';
import propTypes from "prop-types";
import {cn as bem} from "@bem-react/classname";

function Modal({isModalActive, toggleCart, children}) {
  const cn = bem('Modal');
  const a = bem('active');

  return (
    <div className={isModalActive ? cn(null, [a()]) : cn()} onClick={toggleCart}>
      <div className={isModalActive ? cn('content', [a()]) : cn('content')} onClick={e => e.stopPropagation()}>
          {children}
      </div>
    </div>
  )
}

Modal.propTypes = {
  isModalActive: propTypes.bool,
  toggleCart: propTypes.func.isRequired,
  children: propTypes.node
}

Modal.defaultProps = {
  isModalActive: false,
  toggleCart: () => {},
  children: ''
}

export default React.memo(Modal);
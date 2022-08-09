import React from 'react';
import './style.css';
import propTypes from 'prop-types';
import { cn as bem } from "@bem-react/classname";

function Modal({ children, visible }) {
  const cn = bem('Modal');

  return (
    <div className={cn({ 'active': visible })}>
      <div className={cn('content')}>
        {children}
      </div>
    </div>
  )
}

Modal.propTypes = {
  children: propTypes.node.isRequired,
  visible: propTypes.bool
}

Modal.defaultProps = {
  visible: false,
}

export default React.memo(Modal)
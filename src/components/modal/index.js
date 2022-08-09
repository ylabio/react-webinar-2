import React from 'react';
import './style.css';
import propTypes from "prop-types";
import {cn as bem} from "@bem-react/classname";

function Modal({toggleModalShow, children}) {
  const cn = bem('Modal');

  return (
    <div className={cn()} onClick={toggleModalShow}>
      <div className={cn('content')} onClick={e => e.stopPropagation()}>
          {children}
      </div>
    </div>
  )
}

Modal.propTypes = {
  toggleModalShow: propTypes.func.isRequired,
  children: propTypes.node
}

Modal.defaultProps = {
  children: ''
}

export default React.memo(Modal);
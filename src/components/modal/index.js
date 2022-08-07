import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function Modal({children, visible, setVisible}) {
  const cn = bem('Modal');  

  return (
    <div className={`${cn()} ${visible ? cn('active') : ""}`} 
         onClick={() => {setVisible(false)}}>
      <div onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}

Modal.propTypes = {
  children:propTypes.node.isRequired,
  visible: propTypes.bool.isRequired,
  setVisible: propTypes.func
}

Modal.defaultProps = {
  setVisible: () => {}
}

export default Modal;
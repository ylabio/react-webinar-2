import React from 'react';
import './style.css';
import propTypes from "prop-types";

function Modal({active, setActive, children}) {
  return (
    <div className={active ? 'modal active' : 'modal'} onClick={() => setActive(false)}>
      <div className={active ? 'modal__content active' : 'modal__content'} onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}

Modal.propTypes = {
  active: propTypes.bool,
  setActive: propTypes.func.isRequired,
  children: propTypes.node
}

Modal.defaultProps = {
  active: false,
  setActive: () => {}
}

export default React.memo(Modal);
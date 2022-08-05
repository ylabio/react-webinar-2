import React from 'react';
import './style.css';
import propTypes from "prop-types";
import {cn as bem} from "@bem-react/classname";

function Modal({active, setActive, children}) {
  const cn = bem('Modal');
  const a = bem('active');

  return (
    <div className={active ? cn(null, [a()]) : cn()} onClick={() => setActive(false)}>
      <div className={active ? cn('content', [a()]) : cn('content')} onClick={e => e.stopPropagation()}>
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
import React from 'react';
import propTypes from 'prop-types';
import { cn as bem } from "@bem-react/classname";
import './style.css';

function Modal({ cartActive, setCartActive, children }) {
  const cn = bem('Modal');

  return (
    <div className={cartActive ? 'Modal active' : 'Modal'}
      onClick={() => setCartActive(false)}>
      <div className={cn('content')} onClick={(e) => e.stopPropagation()}>
        <button className={cn('closeBtn')} onClick={() => setCartActive(false)}>Закрыть</button>
        {children}
      </div>
    </div>
  )
}

Modal.propTypes = {
  cartActive: propTypes.bool.isRequired,
  setCartActive: propTypes.func.isRequired,
  children: propTypes.node
}

Modal.defaultProps = {
  setCartActive: () => { }
}

export default React.memo(Modal);
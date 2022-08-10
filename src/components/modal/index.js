import React from 'react';
import propTypes from 'prop-types';
import { cn as bem } from "@bem-react/classname";
import './style.css';

function Modal({  setModalActive, children }) {
  const cn = bem('Modal');

  return (
    <div className={'Modal active' }
      onClick={() => setModalActive(false)}>
      <div className={cn('content')} onClick={(e) => e.stopPropagation()}>
        <button className={cn('closeBtn')} onClick={() => setModalActive(false)}>Закрыть</button>
        {children}
      </div>
    </div>
  )
}

Modal.propTypes = {
  modalActive: propTypes.bool.isRequired,
  setModalActive: propTypes.func.isRequired,
  children: propTypes.node
}

Modal.defaultProps = {
  modalActive: false,
  setModalActive: () => { }
}

export default React.memo(Modal);
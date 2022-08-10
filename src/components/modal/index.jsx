import React from 'react';
import propTypes from 'prop-types';
import './style.css';

const Modal = ({ closingFunc, children }) => {
  const close = (e) => {
    if (e.target === e.currentTarget) closingFunc();
  };

  return (
    <div className='modal' onClick={close}>
      <div className='modal__body'>
        { children }
      </div>
    </div>
  )
}

Modal.propTypes = {
  closingFunc: propTypes.func,
  children: propTypes.node
};

Modal.defaultProps = {
  closingFunc: () => {}
};

export default React.memo(Modal);
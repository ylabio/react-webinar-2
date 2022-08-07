import React from 'react';
import propTypes from 'prop-types';
import './style.css';

const Modal = ({ opened, closingFunc, children }) => {
  const close = (e) => {
    if (e.target === e.currentTarget) closingFunc();
  };

  return opened ? (
    <div className='modal' onClick={close}>
      <div className='modal__body'>
        { children }
      </div>
    </div>
  ) : null
}

Modal.propTypes = {
  opened: propTypes.bool,
  closingFunc: propTypes.func,
  children: propTypes.node
};

Modal.defaultProps = {
  opened: false,
  closingFunc: () => {}
};

export default React.memo(Modal);
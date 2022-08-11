import React from 'react';
import './style.css';
import LayoutModal from './layout-modal';
import propTypes from 'prop-types';

const Modal = ({isOpen, onClose, children}) => {
  return isOpen && <LayoutModal close={onClose}>{children}</LayoutModal>
};

Modal.propTypes = {
  isOpen: propTypes.bool.isRequired,
  onClose: propTypes.func.isRequired,
  children: propTypes.node,
}

export default React.memo(Modal);

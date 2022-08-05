import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import LayoutModal from './layout-modal';

const Modal = ({isOpen, onClose, children}) => {
  return isOpen && <LayoutModal close={onClose}>{children}</LayoutModal>
};

export default React.memo(Modal);

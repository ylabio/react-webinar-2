import React from 'react';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import propTypes from "prop-types";

function ModalLayout({ children, closeModal }){
  const cn = bem('ModalLayout');

  return (
    <div 
      className={cn()} 
      onClick={closeModal}
    >
      {children}
    </div>
  );
}

ModalLayout.propTypes = { 
  children: propTypes.node,
  closeModal: propTypes.func.isRequired
};

ModalLayout.defaultProps = {
  closeModal: () => {},
};

export default React.memo(ModalLayout);

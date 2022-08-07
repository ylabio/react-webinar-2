import React from 'react';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import propTypes from "prop-types";

function ModalLayout({ children }){
  const cn = bem('ModalLayout');

  return (
    <div className={cn()}>
      {children}
    </div>
  )
}

ModalLayout.propTypes = { 
  children: propTypes.node,
};

ModalLayout.defaultProps = {
};

export default React.memo(ModalLayout);

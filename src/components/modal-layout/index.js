import React from 'react';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import propTypes from "prop-types";

function ModalLayout({head, children}){
  const cn = bem('ModalLayout');

  return (
    <div className={cn()}>
      <div className={cn('head')}>
        {head}
      </div>
      <div className={cn('content')}>
        {children}
      </div>
    </div>
  )
}

ModalLayout.propTypes = {
  head: propTypes.node,
  children: propTypes.node,
}

ModalLayout.defaultProps = {
}

export default React.memo(ModalLayout);

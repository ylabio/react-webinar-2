import React from "react";
import './style.css';
import {cn as bem} from "@bem-react/classname";

function Modal({active, children}){
  const cn = bem('Modal');

  return (
    <div className={active? `${cn()} active` : cn()}>
      <div className={cn('content')}>
        {children}
      </div>
    </div>
    )
}

export default React.memo(Modal);
import React from 'react';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import propTypes from "prop-types";

function Popup({children}){
  const cn = bem('Popup');

  return (
    <div className={cn()} >
      <div className={cn('content')}>
        {children}
      </div>
    </div>
  )
}

Popup.propTypes = {
  children: propTypes.node,
}

Popup.defaultProps = {
}

export default React.memo(Popup);
import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function Modal(props){
  if(!props.show){
    return null;
  }

  const cn = bem('Modal');

  return (
    <div className={cn()}>
      {props.children}
    </div>
  )
}

Modal.propTypes = {
  children: propTypes.node
}

Modal.defaultProps = {
}

export default React.memo(Modal);
  
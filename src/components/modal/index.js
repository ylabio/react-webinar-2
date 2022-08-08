import React from 'react';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import propTypes from "prop-types";

function Modal(props){
  const cn = bem('Modal');

  return (
    <div className={cn('container')}>
      <div className={cn()}>
        <div className={cn('head')}>
          {props.head}
          <button onClick={props.closeHandler} className={cn('control')}>Закрыть</button>
        </div>
        <div className={cn('content')}>
          {props.children}
        </div>
      </div>
    </div>
  )
}

Modal.propTypes = {
  head: propTypes.node,
  children: propTypes.node,
  closeHandler: propTypes.func.isRequired
}

Modal.defaultProps = {
}

export default React.memo(Modal);

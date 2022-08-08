import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function Modal(props){
  
  const cn = bem('Modal');

  return (
    <div className={cn()}>
      <div className={cn('body')}>
        <div className={cn('head')}>
          <h1>{props.headText}</h1> <button onClick={props.onClose}>Закрыть</button>
        </div>
        <div className={cn('content')}>
          {props.children}
        </div>
      </div>
    </div>
  )
}

Modal.propTypes = {
  children: propTypes.node
}

Modal.defaultProps = {
}

export default React.memo(Modal);
  
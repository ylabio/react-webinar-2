import React from 'react';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import propTypes from "prop-types";

function Modal({title, onClickClose, children}){
  const cn = bem('Modal');

  return (
    <div className={cn('overlay')}>
      <div className={cn('wrapper')}>
        <div className={cn('head')}>
          <h1>{title}</h1>
          <button onClick={onClickClose}>Закрыть</button>
        </div>
        <div className={cn('content')}>
          {children}
        </div>
      </div>
    </div>
  )
}

Modal.propTypes = {
  title: propTypes.string,
  onClickClose:  propTypes.func,
  children: propTypes.node,
}

Modal.defaultProps = {
  title: '',
  onClickClose: () => {}
}

export default React.memo(Modal);
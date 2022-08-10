import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function Modal({head, setModalActive, children}) {
  const cn = bem('Modal');
  return (

    <div className={cn('overlay')}>
      <div className={cn('cross')}>
        <div className={cn('head')}>
          {head}  <div className={cn('action')}>
          <button onClick={()=>setModalActive(false)}>Закрыть</button></div>
        </div>
        <div className={cn('content')}>
          {children}
        </div>
      </div>

    </div>
    
  )
}
 

Modal.propTypes = {
  head: propTypes.node,
  children: propTypes.node,
}

export default React.memo(Modal);
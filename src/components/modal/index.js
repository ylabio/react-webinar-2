import React from 'react';
import {cn as bem} from '@bem-react/classname'
import './style.css'
import propTypes from "prop-types";
 

 function Modal({setActive, children, head}) {
  const cn = bem('Modal');
  return (
    <div className={cn()}>
      <div className={cn('content')}>
         <div className={cn('head')}>
            {head}
            <button className={cn('close-button')} onClick={()=>setActive(false)}>Закрыть</button>
          </div>
         {children}
      </div>      
 
    </div>
  )
}
Modal.propTypes={
  setActive: propTypes.func.isRequired,
  head: propTypes.node,
  children: propTypes.node,
 
}


export default React.memo(Modal)
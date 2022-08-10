import React from 'react';
import {cn as bem} from "@bem-react/classname";
import propTypes from "prop-types";

import './style.css';

function Modal({children, setIsModalActive, title}){
  const cn = bem('Modal');
  
  return (
    <div className={cn()} onClick={setIsModalActive}>
      <div className={cn('content')} onClick={e => e.stopPropagation()}>
        <div className={cn('controls')}>
          <div className={cn('controls__title')}>{title}</div>
          <div>
            <button onClick={setIsModalActive}>Закрыть</button>
          </div>
        </div>
        <div className={cn('children')}>
          {children}
        </div>
      </div>
    </div>
  )
}

Modal.propTypes = {
  setIsModalActive: propTypes.func,
  children: propTypes.node,
}

Modal.defaultProps = {
  setIsModalActive: ()=>{}
}

export default React.memo(Modal);

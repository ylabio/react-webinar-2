import React from 'react';
import {cn as bem} from "@bem-react/classname";
import propTypes from "prop-types";

import './style.css';

function Modal({children, handleCloseModal}){
  const cn = bem('Modal');
  
  return (
    <div className={cn()} onClick={handleCloseModal}>
      <div className={cn('content')} onClick={e => e.stopPropagation()}>
        <div className={cn('controls')}>
          <div className={cn('controls__title')}>Корзина</div>
          <div>
            <button onClick={handleCloseModal}>Закрыть</button>
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
  head: propTypes.node,
  children: propTypes.node,
}

Modal.defaultProps = {
}

export default React.memo(Modal);

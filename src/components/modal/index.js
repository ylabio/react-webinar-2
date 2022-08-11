import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function Modal(props) {
  
  const cn = bem('Modal');

  return (
    <div className={cn('')}>
      <div className={cn('bg')} onClick={() => {props.setVisibility(false)}}>
        <div className={cn('window')} onClick={e => e.stopPropagation()}>

          <div className={cn('head')}>
            <div className={cn('headBg')}>
              {props.head}
              <button onClick={() => {props.setVisibility(false)}}> 
                Закрыть
              </button>
            </div>
          </div>
          <div className={cn('content')}>
            {props.children}
          </div>
        </div>
      </div>
    </div>
  )
}

Modal.propTypes = {
  head: propTypes.node.isRequired, 
  setVisibility: propTypes.func.isRequired,
  children: propTypes.node,
}

Modal.defaultProps = {
  children: null,
}

export default React.memo(Modal);

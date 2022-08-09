import React from "react";
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function LayoutModal(props) {
  const cn = bem('LayoutModal');
  
  return (
    <div className={cn()}>
      <div className={cn('frame')}>
        <div className={cn('head')}>
          {props.head} 
            <div className={cn('head-button')}>
              <button onClick={()=>props.changeModalVisible(false)}>
                Закрыть
              </button>
            </div>
        </div>
        <div className={cn('content')}>
          {props.children}
        </div>
      </div>
    </div>
  )
}

LayoutModal.propTypes = {
  changeModalVisible: propTypes.func.isRequired,
  head: propTypes.node,
  children: propTypes.node
}

export default React.memo(LayoutModal);

import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function Popup({close, children }){
    const cn = bem('Popup');
  
    return (
      <div className={cn()}>
  
        <div onClick={close} className={cn('background')}/>
        <div className={cn('wrapper')}>
            <div className={cn('content')}>
                { children }
            </div>
        </div>
      
      </div>
    )
  }
  
  Popup.propTypes = {
    close: propTypes.func,
    children: propTypes.node,
  }
  
  Popup.defaultProps = {
  }
  
  export default React.memo(Popup);
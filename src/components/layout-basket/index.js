import React from "react";
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function LayoutBasket(props){
  const cn = bem('LayoutBasket');
    let cl = [cn()];
    if (props.basketVisible) {
      cl.push('active')
    }
    
  return (
    <div className={cl.join(' ')}>
      <div className={cn('frame')}>
        <div className={cn('head')}>
          {props.head} 
            <div className={cn('head-button')}>
              <button onClick={()=>props.changeBasketVisible(false)}>
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

LayoutBasket.propTypes = {
  basketVisible: propTypes.bool.isRequired, 
  changeBasketVisible: propTypes.func.isRequired,
  head: propTypes.node,
  children: propTypes.node
}

LayoutBasket.defaultProps = {
  basketVisible: false,
  changeBasketVisible: () => {}
}

export default React.memo(LayoutBasket);

import React from "react";
import propTypes from 'prop-types';
import List from "../list";
import {cn as bem} from "@bem-react/classname";

import './style.css';

function Modal({head, onModalBtn, children}) {
    const cn = bem('Modal')
    

    return (
       <div className={cn()}>
         <div className={cn('content')}>
            <div className={cn('header')}>
                {head}
                <button onClick={onModalBtn}>Закрыть</button>
            </div>
            {children}
            {/* <List items={props.items} onHandleBtn={props.onDeleteItem}/>
            
            <div className={cn('total')}>
                <p className={cn('total-title')}>Итого:</p>
                <p className={cn('total-sum')}>{props.totalPrice.toLocaleString('ru')} ₽</p>
            </div> */}
         </div>
       </div>
    )
}

Modal.propTypes = {
    onModalBtn: propTypes.func.isRequired,
    head: propTypes.node,
    children: propTypes.node
  }
  
Modal.defaultProps = {

  }
  

export default React.memo(Modal)
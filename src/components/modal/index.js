import React from "react";
import propTypes from 'prop-types';
import List from "../list";
import {cn as bem} from "@bem-react/classname";

import './style.css';

function Modal(props) {
    const cn = bem('Modal')
    

    return (
       <div className={cn()}>
         <div className={cn('content')}>
            <div className={cn('header')}>
                <h2>Корзина</h2>
                <button onClick={props.onModalBtn}>Закрыть</button>
            </div>
            
            <List items={props.items} onHandleBtn={props.onDeleteItem}/>
            
            <div className={cn('total')}>
                <p className={cn('total-title')}>Итого:</p>
                <p className={cn('total-sum')}>{props.totalPrice.toLocaleString('ru')} ₽</p>
            </div>
         </div>
       </div>
    )
}

Modal.propTypes = {
    items: propTypes.arrayOf(propTypes.object).isRequired,
    onModalBtn: propTypes.func.isRequired,
    onDeleteItem: propTypes.func.isRequired,
    active: propTypes.bool.isRequired
  }
  
Modal.defaultProps = {
    items: [],
    onModalBtn: () => {},
    onDeleteItem: () => {},
    active: false
  }
  

export default React.memo(Modal)
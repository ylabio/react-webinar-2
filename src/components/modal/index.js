import React from "react";
import propTypes from 'prop-types';
import List from "../list";
import {cn as bem} from "@bem-react/classname";

import './style.css';

function Modal(props) {
    const cn = bem('Modal')
    
    const totalPrice = props.items.reduce((a, b) => a + b.price*b.count, 0)

    return (
       <div className={cn({'active' : props.active})}>
         <div className={cn('content')}>
            <div className={cn('header')}>
                <h2>Корзина</h2>
                <button onClick={props.onModalBtn}>Закрыть</button>
            </div>
            <div className={cn('list')}>
                <List items={props.items} onHandleBtn={props.onDeleteItem}/>
            </div>
            <div className={cn('total')}>
                <p className={cn('total-title')}>Итого:</p>
                <p className={cn('total-sum')}>{totalPrice.toLocaleString('ru')} ₽</p>
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
import React from 'react';
import './style.css';
import {cn as bem} from "@bem-react/classname";
import propTypes from "prop-types";



function Modal(props){
    const cn = bem('Modal');
    const children = props.children;

    const totalPrice = props.items.reduce((a, b) => a + b.price * b.amount, 0)

    return (
        <div className='overlay'>
            <div className={cn()}>
                <div className={cn('head')}>
                    <div className={cn('title')}>
                        <h1>Корзина</h1>
                    </div>
                    <div className={cn('close')}>
                        <button onClick={props.onClose}>Закрыть</button>
                    </div>
                </div>
                <div className={cn('content')}>
                    {children}

                    <div className={cn('total')}>
                        <p className={cn('total-title')}>Итого:</p>
                        <p className={cn('total-sum')}>{totalPrice} ₽</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

Modal.propTypes = {
    children: propTypes.node
}
export default React.memo(Modal);
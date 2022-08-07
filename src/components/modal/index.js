import React from 'react';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import propTypes from "prop-types";

function Modal(props) {
    const cn = bem('Modal');

    return (
        <div className={cn()}>
            <div className={cn('content')}>
                <div className={cn('header')}>
                    <div className={cn('title')}>
                        <h1>Корзина</h1>
                    </div>
                    <div className={cn('headerActions')}>
                        <button onClick={props.closeModal}>Закрыть</button>
                    </div>
                </div>
                <div className={cn('body')}>
                    {props.children}
                    <div className={cn('total')}>
                        <b>Итого</b>
                        <b className={cn('totalSum')}>{props.amount ? `${props.price.toLocaleString()} ₽` : 'пусто'}</b>
                    </div>
                </div>
            </div>
        </div>
    )
}

Modal.propTypes = {
    closeModal: propTypes.func.isRequired,
    children: propTypes.node,
    amount: propTypes.number.isRequired,
    price: propTypes.number.isRequired
}

Modal.defaultProps = {
    closeModal: () => {},
    amount: 0,
    price: 0
}

export default React.memo(Modal);

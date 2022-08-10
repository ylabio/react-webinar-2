import React from 'react'
import './style.css';
import {cn as bem} from "@bem-react/classname";
import PropTypes from "prop-types";

export const CartModal = (props) => {
    const cn = bem('Modal');

    return (
        <div className={cn()}>
            <header className={cn('header')}>
                <h2 className={cn('header-title')}>
                    {props.title}
                </h2>
                <button onClick={props.closeModal}>
                    Закрыть
                </button>
            </header>
            {props.children}
        </div>
    )
}


CartModal.propTypes = {
    title: PropTypes.string.isRequired,
    closeModal: PropTypes.func.isRequired,
    children: PropTypes.elementType
}
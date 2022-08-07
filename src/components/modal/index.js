import React from "react";
import {cn as bem} from "@bem-react/classname";
import './style.css';
import propTypes from "prop-types";
import List from "../list"
import { getTotalPrice } from "../../utils"

function Modal(props) {

    const cn = bem('Modal');

    return(
        <div className={props.isVisible ? cn("visible") : cn()}>
            <div className={cn('container')}>
                <div className={cn('header')}>
                    <h1>Корзина</h1>
                    <button className={cn('btn')} onClick={props.onClose}>Закрыть</button>
                </div>
                <List items={props.listItems} isVisible={props.isVisible} onItemDelete={props.onItemDelete}/>
                <div className={cn('spans')}>
                    <span>Итого </span>
                    <span>{`${getTotalPrice(props.listItems)} ₽`}</span>
                </div>
            </div>
        </div>
    )
}

Modal.propTypes = {
    onItemDelete: propTypes.func.isRequired,
    listItems: propTypes.arrayOf(propTypes.object)
}

Modal.defaultProps = {
    isVisible: false,
    onItemDelete: () => {},
    listItems: []
}

export default React.memo(Modal)

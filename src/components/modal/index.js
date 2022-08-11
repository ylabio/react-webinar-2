import React from "react";
import {cn as bem} from "@bem-react/classname";
import './style.css';
import propTypes from "prop-types";
import List from "../list"
import Layout from "../layout"

function Modal(props) {

    const cn = bem('Modal');

    return(
        <div className={props.isVisible ? cn("visible") : cn()}>
            <div className={cn('container')}>
                <Layout head={<h1>Корзина</h1>} buttonTitle="Закрыть" onClose={props.onClose}>
                    <List items={props.listItems} isVisible={props.isVisible} onItemDelete={props.onItemDelete}/>
                    <div className={cn('spans')}>
                        <span>Итого </span>
                        <span>{`${props.totalPrice.toLocaleString('ru-RU')} ₽`}</span>
                    </div>
                </Layout>
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
    listItems: [],
    totalPrice: 0
}

export default React.memo(Modal)

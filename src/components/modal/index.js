import React from 'react';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import propTypes from "prop-types";
import Cart from "../cart"

function Modal(props){
    const cn = bem('Modal');

    return (
        <div className={cn()}>
            <div className={cn('content')}>
                <div className={cn('header')}>
                    <p>Корзина</p>
                    <div className={cn('actions')}>
                        <button onClick={props.closeModal}>
                            Закрыть
                        </button>
                    </div>
                </div>
                <Cart
                    cart={props.cart}
                    lengthCart={props.lengthCart}
                    onItemDelete={props.onItemDelete}
                    amount={props.amount}
                    items={props.items}
                />
            </div>
        </div>
    )
}

Modal.propTypes = {
    cart: propTypes.arrayOf(propTypes.object).isRequired,
    items: propTypes.arrayOf(propTypes.object).isRequired,
    lengthCart:propTypes.number.isRequired,
    closeModal: propTypes.func.isRequired,
    amount:propTypes.number.isRequired,
    onItemDelete:propTypes.func.isRequired
};

Modal.defaultProps = {
};

export default React.memo(Modal);

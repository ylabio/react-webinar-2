import React from 'react';
import './style.css';
import {cn as bem} from "@bem-react/classname";
import List from "../list";
import {spaceInPrice} from "../../utils";
import propTypes from 'prop-types';


function Modal(props){

    const cn = bem('Modal');

    return (
        <div className={cn('')}>
            <div className={cn('container')}>
                <div className={cn('header')}>
                    <p>Корзина</p>
                    <div className={cn('actions')}>
                        <button onClick={props.closeModal}>
                            Закрыть
                        </button>
                    </div>
                </div>
                <List items={props.cart}  cart={props.cart} onItemDelete={props.onItemDelete} openedModal={props.openedModal}/>
                {props.cart.length
                    ?
                        <div className={cn('total')}>
                            Итого: <p className={cn('sum')}>{spaceInPrice(props.result)}  ₽</p>
                        </div>
                    :
                        <div className={cn('empty')}>
                            Корзина пуста
                        </div>
                }
            </div>
        </div>
    )
}

Modal.propTypes = {
    cart: propTypes.arrayOf(propTypes.object).isRequired,
    onItemDelete: propTypes.func.isRequired,
    closeModal: propTypes.func.isRequired,
    result:propTypes.number.isRequired,
    openedModal:propTypes.bool,
};

Modal.defaultProps = {
    cart:[],
    onItemDelete: () => {},
    result: 0
};

export default React.memo(Modal);
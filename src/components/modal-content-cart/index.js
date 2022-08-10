import List from "../list";
import React from "react";
import PropTypes from "prop-types";
import {cn as bem} from "@bem-react/classname";
import './style.css';

export const ModalContentCart = (props) => {

    const cn = bem('Modal-content');
    return(
        <div>
            <div className={cn('list')}>
                <List type='modal' items={props.list}
                      onItemSelect={props.callback}/>
            </div>

            <div className={cn('last-price')}>
                {props.count !== 0 ? (<>
                    <b className={cn('result')}>
                        Итого
                    </b>

                    <b className={cn('result')}>
                        {props.price.toLocaleString()} ₽
                    </b>
                </>) : <b className={cn('empty-cart')}>Корзина пуста</b>}
            </div>
        </div>
    )
}

ModalContentCart.propTypes = {
    price: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
    callback: PropTypes.func.isRequired,
    list: PropTypes.array.isRequired
}
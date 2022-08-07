import React, {useCallback} from 'react';
import propTypes from "prop-types";
import {cn as bem} from "@bem-react/classname";
import './style.css'

export const CartItem = React.memo((props) => {
    const cn = bem('cartItem');

    const callbacks = {
        onDelete: useCallback((e) => {
            e.stopPropagation();
            props.onDelete(props.cartItem.code)
        }, [props.onDelete, props.cartItem])
    }

    return (
        <div className={cn()}>
            <div className={cn('number')}>
                {props.cartItem.code}
            </div>
            <div className={cn('title')}>
                {props.cartItem.title}
            </div>
            <div className={cn('price')}>
                {props.cartItem.price} ₽
            </div>
            <div className={cn('count')}>
                {props.count} шт
            </div>
            <div className={cn('actions')}>
                <button onClick={callbacks.onDelete}>
                    Удалить
                </button>
            </div>
        </div>
    );
}
)

CartItem.propTypes = {
    count: propTypes.number,
    cartItem: propTypes.object.isRequired,
    onDelete: propTypes.func.isRequired
}

CartItem.defaultProps = {
    onDelete: () => {}
}


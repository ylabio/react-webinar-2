import React, {useCallback, useState} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function Item(props) {
    const cn = bem('Item');

    const callbacks = {
        onAddToCart: useCallback(() => {
            props.onAddToCart(props.item.code);
        }, [props.onAddToCart, props.item])
    };

    return (
        <div className={cn()}>
            <div className={cn('number')}>
                {props.item.code}
            </div>
            <div className={cn('title')}>
                {props.item.title}
            </div>
            <div className={cn('price')}>
                {props.item.price.toLocaleString('ru-RU', { style: 'currency', currency: 'RUB', maximumSignificantDigits: 20 })}
            </div>
            <div className={cn('actions')}>
                <button onClick={callbacks.onAddToCart}>
                    Добавить
                </button>
            </div>
        </div>
    )
}

Item.propTypes = {
    item: propTypes.object.isRequired,
    onAddToCart: propTypes.func.isRequired,
}

Item.defaultProps = {
    onAddToCart: () => {},
}

export default React.memo(Item);

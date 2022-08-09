import React, {useCallback, useState} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function CartItem(props) {
    const cn = bem('CartItem');

    const callbacks = {
        onDeleteItems: useCallback(() => {
          props.onDeleteItems(props.item.code);
        }, [props.onDeleteItems,  props.item])
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
                {Intl.NumberFormat('ru-RU').format(props.item.price)} ₽
            </div>
            <div className={cn('count')}>
                {props.item.count} шт
            </div>
            <div className={cn('actions')}>
                <button onClick={callbacks.onDeleteItems}>
                    Удалить
                </button>
            </div>
        </div>
    )
}

CartItem.propTypes = {
    item: propTypes.object.isRequired,
    onDeleteItems: propTypes.func.isRequired
}

CartItem.defaultProps = {
    onDeleteItems: () => {}
}

export default React.memo(CartItem);

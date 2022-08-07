import React, {useCallback, useState} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function Item({item, onAddBasketItem}) {
    const cn = bem('Item');

    const callbacks = {
        onAddBasketItem: useCallback((e) => {
            onAddBasketItem({code: item.code, title: item.title, price: item.price});
        }, [onAddBasketItem, item])
    };
    return (
        <div className={cn()}>
            <div className={cn('number')}>
                {item.code}
            </div>
            <div className={cn('title')}>
                {item.title}
            </div>
            <div className={cn('price')}>
                {item.price.toLocaleString()}<span className={cn('currency')}>₽</span>
            </div>
            <div className={cn('actions')}>
                <button onClick={callbacks.onAddBasketItem}>
                    Добавить
                </button>
            </div>
        </div>
    )
}

Item.propTypes = {
    item: propTypes.object.isRequired,
    onAddBasketItem: propTypes.func.isRequired,
}

export default React.memo(Item);

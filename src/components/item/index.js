import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function Item({item, itemAction}) {
    const cn = bem('Item');

    const callbacks = {
        onAddBasketItem: useCallback((e) => {
            itemAction(item.code);
        }, [itemAction, item])
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
    itemAction: propTypes.func.isRequired,
}

export default React.memo(Item);

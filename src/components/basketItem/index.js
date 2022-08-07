import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function BasketItem({item, deleteItem}) {
    const cn = bem('Basket');

    const callbacks = {
        onDeleteItem: useCallback(() => {
            deleteItem(item.code)
        }, [deleteItem, item])
    };

    return (
        <div className={cn()}>
            <div className={cn('number')}>
                {item.id}
            </div>
            <div className={cn('title')}>
                {item.title}
            </div>
            <div className={cn('price')}>
                {item.price.toLocaleString()}<span className={cn('currency')}>₽</span>
            </div>
            <div className={cn('count')}>
                {item.count.toLocaleString()}<span className={cn('currency')}>шт</span>
            </div>
            <div className={cn('actions')}>
                <button onClick={() => callbacks.onDeleteItem()}>
                    Удалить
                </button>
            </div>
        </div>
    )
}

BasketItem.propTypes = {
    item: propTypes.object.isRequired,
    deleteItem: propTypes.func.isRequired,
}

export default React.memo(BasketItem);

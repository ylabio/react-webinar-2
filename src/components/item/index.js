import React, {useCallback, useState} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import plural from 'plural-ru';
import './style.css';

function Item({onAdd, onDelete, item, num}) {
    const cn = bem('Item');

    const callbacks = {
        onDelete: useCallback(() => {
            onDelete(item.code)
        }, [onDelete, item]),

        onAdd: useCallback(() => {
            onAdd(item.code);
        }, [onAdd, item])
    };

    return (
        <div className={cn({'selected': item.selected})}>

            <div className={cn('number')}>
                {num}
            </div>
            <div className={cn('title')}>
                {item.title}
            </div>
            <div className={cn('price')}>
                {item.price}
            </div>
            {item.amount ? <div className={cn('amount')}>{`${item.amount} шт`}</div> : null}
            <div className={cn('actions')}>
                <button onClick={item.amount ? callbacks.onDelete : callbacks.onAdd}>
                    {item.amount ? 'Удалить' : 'Добавить'}
                </button>
            </div>

        </div>
    )
}

Item.propTypes = {
    item: propTypes.object.isRequired,
    onDelete: propTypes.func,
    onAdd: propTypes.func,
    num: propTypes.number
}

Item.defaultProps = {
    item: [],
    onDelete: () => {},
    onAdd: () => {},
    num: 0
}

export default React.memo(Item);

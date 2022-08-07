import React, {useCallback, useEffect, useState} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import plural from 'plural-ru';
import './style.css';

function Item(props) {
    const cn = bem('Item');

    useEffect(() => {
        console.log('item displayed')
    })

    const callbacks = {

        onClick: useCallback(() => {
            props.onSelect(props.item.code, props.item.title, props.item.price, props.item.counter);

        }, [props.onSelect, props.item])
    };


    return (
        <div className={cn()}>
            <div className={cn('number')}>
                {props.item.code}
            </div>
            <div className={cn('title')}>
                {props.item.title}
            </div>
            <div className={cn('price_container')}>
                <p className={cn('price')}>
                    {props.item.price} ₽
                </p>
                <div className={cn('actions')}>
                    <button onClick={callbacks.onClick}>
                        Добавить
                    </button>
                </div>
            </div>
        </div>
    )
}

Item.propTypes = {
    item: propTypes.object.isRequired,
    onSelect: propTypes.func.isRequired,

}

Item.defaultProps = {
    onSelect: () => {
    },
}

export default React.memo(Item);

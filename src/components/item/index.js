import React, {useCallback, useState} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function Item(props) {
    const cn = bem('Item');

    const callbacks = {

        // onClick: useCallback(() => {
        //   props.onSelect(props.item.code);
        //   if (!props.item.selected) {
        //     setCount(count + 1);
        //   }
        // }, [props.onSelect, props.item, setCount, count]),
        //
        // onDelete: useCallback((e) => {
        //   e.stopPropagation();
        //   props.onDelete(props.item.code)
        // }, [props.onDelete,  props.item]),


        onAddToCart: useCallback(() => {
            props.onAddToCart(props.item.code);
        }, [props.onAddToCart, props.item])
    };

    return (
        <div className={cn({'selected': props.item.selected})}>
            <div className={cn('number')}>
                {props.item.code}
            </div>
            <div className={cn('title')}>
                {props.item.title}
            </div>
            <div className={cn('price')}>
                {props.item.price}
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
    onTest: propTypes.func.isRequired,
    onAddToCart: propTypes.func.isRequired,
    // onSelect: propTypes.func.isRequired,
    // onDeleted: propTypes.func.isRequired
}

Item.defaultProps = {
    onAddToCart: () => {},
    // onSelect: () => {},
    // onDeleted: () => {}
}

export default React.memo(Item);

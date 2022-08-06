import React, {useCallback, useState} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import store from "../../store";
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
        onDelete: useCallback((e) => {
          e.stopPropagation();
          props.onDelete(props.item.code)
        }, [props.onDelete,  props.item]),

        addToCart: useCallback(() => {
            console.log('addToCart', props.item.code, props.item.price);
        }, [props.addToCart(), props.item])

    };

    return (
        <div className={cn({'selected': props.item.selected})} onClick={callbacks.onClick}>
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
                <button onClick={callbacks.addToCart}>
                    Добавить
                </button>
            </div>
        </div>
    )
}

Item.propTypes = {
    item: propTypes.object.isRequired,
    addToCart: propTypes.func.isRequired,
    // onSelect: propTypes.func.isRequired,
    // onDeleted: propTypes.func.isRequired
}

Item.defaultProps = {
    addToCart: () => {}
    // onSelect: () => {},
    // onDeleted: () => {}
}

export default React.memo(Item);

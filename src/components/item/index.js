import React, { useCallback, useState } from 'react';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import {formatPrice} from '../../utils/utils.js';
import './style.css';

function Item(props) {
    const cn = bem('Item');

    const formattedPrice = formatPrice(props.item.price, 0);

    const callbacks = {
        // onClick: useCallback(() => {
        //     props.onSelect(props.item.code);
        //     if (!props.item.selected) {
        //         setCount(count + 1);
        //     }
        // }, [props.onSelect, props.item, setCount, count]),

        // onDelete: useCallback(
        //     (e) => {
        //         e.stopPropagation();
        //         props.onDelete(props.item.code);
        //     },
        //     [props.onDelete, props.item]
        // ),

        onAddToCart: useCallback(() => {
            props.onAddToCart(props.item);
        }, [props.onAddToCart, props.item]),

        onDeleteFromCart: useCallback(() => {
            props.onDeleteFromCart(props.item.code);
        }, [props.onAddToCart, props.item]),
    };

    return (
        <div className={cn()}>
            <div className={cn('inner')}>
                <div className={cn('number')}>{props.item.code}</div>
                <div className={cn('title')}>{props.item.title}</div>
            </div>
            <div className={cn('inner')}>
                <div className={cn('price')}>{formattedPrice}</div>
                {props.item.quantity && (
                    <div
                        className={cn('quantity')}
                    >{`${props.item.quantity} шт`}</div>
                )}

                {props.item.quantity ? (
                    <div className={cn('actions')}>
                        <button onClick={callbacks.onDeleteFromCart}>
                            Удалить
                        </button>
                    </div>
                ) : (
                    <div className={cn('actions')}>
                        <button onClick={callbacks.onAddToCart}>
                            Добавить
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

Item.propTypes = {
    item: propTypes.object.isRequired,
    onAddToCart: propTypes.func.isRequired,
    onDeleteFromCart: propTypes.func.isRequired,
};

Item.defaultProps = {
    onAddToCart: () => {},
    onDeleteFromCart: () => {},
};

export default React.memo(Item);

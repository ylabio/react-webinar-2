import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function PopupItem(props) {
    const cn = bem('Item');
    const callbacks = {
        deleteFromCart: useCallback(() => {
            props.deleteFromCart(props.item.code);
        }, [props.onDeleteFromCart, props.item])
    }
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
            <div className={cn('amount')}>
                {props.item.count + ' шт'}
            </div>
            <div className={cn('actions')}>
                <button onClick={callbacks.deleteFromCart}>
                    Удалить
                </button>
            </div>

        </div>
    )
}

PopupItem.propTypes = {
    item: propTypes.object.isRequired,
    deleteFromCart: propTypes.func.isRequired,
}

PopupItem.defaultProps = {
    item: {},
    deleteFromCart: () => {},
}

export default React.memo(PopupItem);

import React, {useCallback} from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import {getPrice} from "../../utils";

function Item(props) {
    const cn = bem('Item');

    const callbacks = {
        callBackOnClick: useCallback((e) => {
            e.stopPropagation()
            props.callBackOnClick(props.item)
        }, [props.callBackOnClick, props.item])
    };

    const price = getPrice(props.item.price)
    const quantityNum = props.item.quantity

    return (
        <div className={cn()}>
            <div className={cn('number')}>
                {props.item.code}
            </div>
            <div className={cn('title')}>
                {props.item.title}
            </div>
            <div className={cn('price')}>
                {price}
            </div>
            {quantityNum && <div className={cn('amount')}>
                <span>{quantityNum}</span><span>шт</span>
            </div>}
            <div className={cn('actions')}>
                <button onClick={callbacks.callBackOnClick}>
                    {props.label}
                </button>
            </div>
        </div>
    )
}

Item.propTypes = {
    item: propTypes.object.isRequired,
    callBackOnClick: propTypes.func.isRequired,
    label: propTypes.string.isRequired
}

Item.defaultProps = {
    item: {},
    callBackOnClick: () => {
    },
    label: 'Кнопка'
}

export default React.memo(Item);

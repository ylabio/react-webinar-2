import React, {useCallback} from "react";
import './style.css';
import {cn as bem} from "@bem-react/classname";

export const ModalItem = (props) => {
    const cn = bem('Item');

    const callbacks = {
        onClick: useCallback(() => {
            props.onSelect(props.item.code);
        }, [props.item])
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
                <p className={cn('row')}>
                    {props.item.price} ₽
                </p>

                <p className={cn('row')}>
                    {props.item.counter} шт
                </p>
                <div className={cn('actions')}>
                    <button onClick={callbacks.onClick}>
                        Удалить
                    </button>
                </div>
            </div>
        </div>
    )
}
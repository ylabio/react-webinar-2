import React, {useCallback} from 'react'
import './style.css';
import {cn as bem} from "@bem-react/classname";

function ModalItem({item, index, deleteItemFromBasket}) {

    const cn = bem('ModalItem')

    return (
        <>
            <div className={cn({'selected': item.selected})}>
                <div className={cn('number')}>
                    {index + 1}
                </div>
                <div className={cn('title')}>
                    {item.title}
                </div>
                <p className = {cn('price')}>
                    {item.price} ₽
                </p>
                <p className = {cn('amount')}>
                    {item.countOnBasket} шт
                </p>
                <div className={cn('actions')}>
                    <button onClick = {() => deleteItemFromBasket(item)}>
                        Удалить
                    </button>
                </div>
            </div>
        </>
    )
}

export default React.memo(ModalItem)
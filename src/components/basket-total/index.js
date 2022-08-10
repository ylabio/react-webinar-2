import React from 'react';
import './style.css';
import {cn as bem} from "@bem-react/classname";

function BasketTotal ({totalCount, totalPrice}) {
    const cn = bem('Basket-total');
    return (
        <div>
            {totalCount
                ? <div className={cn('price')}>Итого <span
                    className={cn('count')}>{totalPrice.toLocaleString()}</span>₽</div>
                : <div className={cn('empty')}>Упс, корзина пустая!</div>
            }
        </div>
    )
}

BasketTotal.defaultProps = {
    totalCount: null,
    totalPrice: null
}

export default React.memo(BasketTotal);
import React from 'react';
import './style.css';
import {cn as bem} from "@bem-react/classname";
import {number} from "prop-types";

function basketTotal ({totalCount, totalPrice}) {
    const cn = bem('basket-total');
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

basketTotal.propTypes = {
    totalCount: number.isRequired,
    totalPrice: number.isRequired
}

export default React.memo(basketTotal);
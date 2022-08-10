import React from "react";
import { cn as bem } from "@bem-react/classname";
import propTypes from 'prop-types';
import "./style.css";

const CartPrice = ({totalPrice}) => {
    const cn = bem('Cart-price');

    return (
        <div className={cn()}>
            <div className={cn('wrapper')}>
                <p className={cn('title')}>Итого:</p>
                <p className={cn('sum')}>{totalPrice.toLocaleString('ru')} ₽</p>
            </div>
            
        </div>
    )
}

CartItem.propTypes = {
    totalPrice: propTypes.number.isRequired,
}

export default React.memo(CartPrice)
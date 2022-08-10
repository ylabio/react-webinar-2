import React from 'react';
import propTypes from 'prop-types';
import './style.css';
import plural from "plural-ru";
import {cn as bem} from "@bem-react/classname";
import BaseButton from "../base-button";

function Controls({cartItems,setActivePopupCart}) {
    const cn = bem('Controls');
    const getTotalPrice = cartItems?.reduce((sum, cartItem) => {
        return sum + cartItem.price * cartItem.count
    }, 0)

    return (
        <div className='Controls'>
            <span className={cn('cart')}>В корзине:</span>
            <span className='Controls__cartItem'>
            <h3>
                {cartItems.length > 0 ? `${cartItems.length} ${plural(cartItems.length,'товар', 'товара', 'товаров')} / ${getTotalPrice} ₽`:'пусто'}
            </h3>
        </span>
            <BaseButton onClick={() => setActivePopupCart(true)}>Перейти</BaseButton>
        </div>
    )
}

Controls.propTypes = {
    cartItems: propTypes.arrayOf(propTypes.object).isRequired,
    setActivePopupCart: propTypes.func.isRequired,
}

Controls.defaultProps = {
    cartItems:[],
    setActivePopupCart: false
}

export default React.memo(Controls);
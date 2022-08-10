import {cn as bem} from "@bem-react/classname";
import './style.css'
import BaseButton from "../base-button";
import React from "react";
import TotalPriceCart from "../total-price-cart";
import propTypes from "prop-types";

const CartPopup = ({setActivePopupCart, children, cartItems}) => {
    const cn = bem('Modal')
    const getTotalPrice = cartItems?.reduce((sum, cartItem) => {
        return sum + cartItem.price * cartItem.count
    }, 0)

    return (
        <div className={cn('')}>
            <div className={cn('cart-container')}>
                <div className={cn('cart-head')}>
                    <h2>КОРЗИНА</h2>
                    <div className={cn('closed-cart')} onClick={() => setActivePopupCart(false)}>
                        <BaseButton>Закрыть</BaseButton></div>
                </div>
                <div className={cn('items')}>
                    {children}
                    <TotalPriceCart getTotalPrice={getTotalPrice}/>
                </div>

            </div>
        </div>
    )
}
export default React.memo(CartPopup)

CartPopup.propTypes = {
    setActivePopupCart: propTypes.func.isRequired,
    children: propTypes.node,
    cartItems:propTypes.arrayOf(propTypes.object).isRequired,
}

CartPopup.defaultProps = {
    setActivePopupCart: false,
    cartItems:[],
}


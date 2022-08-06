import React, { useCallback } from "react"
import {cn as bem} from "@bem-react/classname";
import propTypes from "prop-types"
import List from "../list";
import "./style.css"

let Cart = ({cart, totalCartPrice, onCartClose, onDeleteItemFromCart}) => {
    let cn = bem("Cart");
    let callbacks = {
        onClose: useCallback((e) => {
            e.stopPropagation();
            onCartClose()
        }, [onCartClose])
    }
    return (
    <div className={cn()}>
        <div className={cn("wrapper")}>
            <div className={cn('head')}>
                <h1>Корзина</h1>
                <button onClick={callbacks.onClose}>Закрыть</button>
            </div>
        <div className={cn("list")}>
            <List items={cart} itemFunc={onDeleteItemFromCart} isInCart={true} />
        </div>
        {
        totalCartPrice > 0 ?
        <div className={cn("total")}><span>Итого</span> {totalCartPrice} ₽</div>
        :
        <></>
        }
        </div>
    </div>
    )
}

Cart.propTypes = {
    cart: propTypes.array,
    totalCartPrice: propTypes.number,
    onCartClose: propTypes.func,
    onDeleteItemFromCart: propTypes.func,
}

Cart.defaultProps = {
    cart: {},
    totalCartPrice: 0,
    onCartClose: () => {},
    onDeleteItemFromCart: () => {},
}

export default React.memo(Cart)
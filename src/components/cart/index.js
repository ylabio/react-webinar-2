import React from "react";
import {cn as bem} from "@bem-react/classname";
import propTypes from "prop-types";
import List from "../list";
import "./style.css";
import Modal from "../modal";

let Cart = ({cart, totalCartPrice, onCartClose, onDeleteItemFromCart}) => {
    let cn = bem("Cart");

    return (
    <div className={cn()}>
        <Modal head={"Корзина"} callback={onCartClose}>
            <div className={cn("list")}>
                <List items={cart} itemFunc={onDeleteItemFromCart} isInCart={true} />
            </div>
            {
            cart.length > 0 ?
            <div className={cn("total")}><span>Итого</span> {totalCartPrice.toLocaleString("ru-RU")} ₽</div>
            :
            <></>
            }
        </Modal>
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
    totalCartPrice: undefined,
    onCartClose: () => {},
    onDeleteItemFromCart: () => {},
}

export default React.memo(Cart)
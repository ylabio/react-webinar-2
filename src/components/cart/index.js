import React from 'react';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import propTypes from "prop-types";
import CartItem from "../cart_item";

function Cart(props) {
    const cn = bem('Cart');

    return (
        <div className={cn()}>
            <div className={cn('window')}>
                <div className={cn('head')}>
                    <h1>Корзина</h1>
                    <button className={cn('close')} onClick={props.closeCart}>
                        Закрыть
                    </button>
                </div>
                {props.itemsCart.map(item =>
                    <div className={cn('item')}>
                        <CartItem key={item.code}
                                  item={item}
                                  onDeleteItems={props.onDeleteItems}/>
                    </div>)}
                <div className={cn('total')}>
                    Итого <span>{props.totalPrice} ₽</span>
                </div>
            </div>
        </div>
    )
}

Cart.propTypes = {
    head: propTypes.node,
    children: propTypes.node,
    onDeleteItems: propTypes.func
}

Cart.defaultProps = {
    onDeleteItems: () => {
    }
}
export default React.memo(Cart);

import React from 'react';
import {cn as bem} from "@bem-react/classname";
import './style.css';
import propTypes from "prop-types";
import CartItem from "../cart_item";

function Cart(props) {
    const cn = bem('Cart');

    return (
        <div>
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
    )
}

Cart.propTypes = {
    itemsCart: propTypes.arrayOf(propTypes.object).isRequired,
    totalPrice: propTypes.number.isRequired,
    onDeleteItems: propTypes.func,
}

Cart.defaultProps = {
    itemsCart: [],
    totalPrice: 0,
    onDeleteItems: () => {
    },
}
export default React.memo(Cart);

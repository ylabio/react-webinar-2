import React from "react";
import propTypes from "prop-types";
import {cn as bem} from "@bem-react/classname";

import "./style.css";
import CartItem from "../cart-item";

function Cart({cart, onClose, totalSum, onRemove}) {
    const cn = bem('Cart');

    return (
        <div className={cn()}>
            <div className={cn('head')}>
                <h1 className={cn('title')}>Корзина</h1>
                <button className={cn('btn')} onClick={onClose}>Закрыть</button>
            </div>
            {cart.length
            ?(<>
                <div className={cn('body')}>
                    {cart.length && (
                        cart.map((c, index) => <CartItem key={c.code} item={c} index={index + 1} onRemove={onRemove}/>)
                    )}
                </div>
                <div className={cn('footer')}>
                    <span>Итого</span>
                    <span>{totalSum()} &#8381;</span>
                </div>
            </>)
                : <h1 className={cn('banner')}>Ничего нет... &#9785;</h1>
            }
        </div>
    );
}

Cart.propTypes = {
    cart: propTypes.array.isRequired,
    onClose: propTypes.func.isRequired,
    totalSum: propTypes.func.isRequired,
    onRemove: propTypes.func.isRequired,
}

export default React.memo(Cart);
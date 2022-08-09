import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function Controls(props) {
    const plural = require('plural-ru');
    const cn = bem('Controls');
    const cartTotal = props.cart.reduce((acc, item) => acc + (item.price * item.count), 0);
    const cartItems = props.cart.length;
    return (
        <div className={cn('')}>
            <div className={cn('info')}>
                <p>В корзине: <b>{cartItems > 0 ? `${plural(cartItems, '%d товар', '%d товара', '%d товаров')} / ${cartTotal.toLocaleString('ru-RU', { style: 'currency', currency: 'RUB', maximumSignificantDigits: 20 })}` : "Пусто"}</b></p>
            </div>
            <div>
                <button onClick={() => props.setButtonPopup(true)}>Перейти</button>
            </div>
        </div>
    )
}

Controls.propTypes = {
    cart: propTypes.arrayOf(propTypes.object).isRequired,
}

Controls.defaultProps = {
    cart: [],
}

export default React.memo(Controls);

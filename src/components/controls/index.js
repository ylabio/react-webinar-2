import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function Controls(props) {
    const plural = require('plural-ru');
    const cn = bem('Controls');
    const cartTotal = props.cart.reduce((acc, item) => acc + item.price, 0);
    const cartItems = props.cart.length;
    return (
        <div className={cn('')}>
            <div className={cn('info')}>
                <p>В корзине: <b>{cartTotal > 0 ? `${plural(cartItems, '%d товар', '%d товара', '%d товаров')} / ${cartTotal}` : "Пусто"}</b></p>
            </div>
            <div>
                <button>Перейти</button>
            </div>
        </div>
    )
}

Controls.propTypes = {
    cart: propTypes.arrayOf(propTypes.object).isRequired,
}

Controls.defaultProps = {}

export default React.memo(Controls);

import React from 'react';
import propTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import plural from 'plural-ru';

import './style.css';

function CartCounter({cart}) {
    const cn = bem('Cart-counter');

    const cartItems = <>{cart.items.length} {plural(cart.items.length, 'товар', 'товара', 'товаров')}</>;
    const cartPrice = <>{cart.price.toLocaleString('ru-RU')}<span> ₽</span></>;


    return (
        <div className={cn()}>
            <div className={cn('info')}>
                <span className={cn('title')}>В корзине:</span>

                {cart.items.length ?
                    <span className={cn('text')}>{cartItems} / {cartPrice}</span> :
                    <span className={cn('text')}>Пусто</span>}
            </div>

            <button className={cn('button')}>Перейти</button>
        </div>
    );
}

CartCounter.propTypes = {
    cart: propTypes.object.isRequired,
};

CartCounter.defaultProps = {
    cart: {},
};

export default React.memo(CartCounter);

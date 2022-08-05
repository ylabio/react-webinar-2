import React from 'react';
import propTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { formatPrice } from '../../utils/utils.js';
import List from '../list';
import './style.css';

function Cart(props) {
    const cn = bem('Cart');

    const content =
        props.cart.items.length > 0 ? (
            <>
                <List
                    items={props.cart.items}
                    onAddToCart={props.onAddToCart}
                    onDeleteFromCart={props.onDeleteFromCart}
                />
                <div>{`Итого: ${props.cart.totalPrice}`}</div>
            </>
        ) : (
            `В корзине пока ничего нет`
        );

    return (
        <div className={cn()}>
            <div className={cn('header')}>
                <h1>Корзина</h1>
                <button onClick={props.onCartClose}>Закрыть</button>
            </div>
            {props.cart.items.length === 0 && <p>В корзине пока ничего нет</p>}
            {props.cart.items.length > 0 && (
                <div className={cn('content')}>
                    <List
                        items={props.cart.items}
                        isCartList={true}
                        onDeleteFromCart={props.onDeleteFromCart}
                    />
                    <div className={cn('total')}>
                        <div>Итого</div>
                        <div>{formatPrice(props.cart.totalPrice, 0)}</div>
                    </div>
                </div>
            )}
        </div>
    );
}

List.propTypes = {
    cart: propTypes.object.isRequired,
    onDeleteFromCart: propTypes.func,
};

List.defaultProps = {
    cart: {},
    onDeleteFromCart: () => {},
};

export default React.memo(Cart);
